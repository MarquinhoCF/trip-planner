import fastify, { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { prisma } from "../lib/prisma";
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/pt-br';
import { getMailClient } from "../lib/mail";
import nodemailer from 'nodemailer';

dayjs.locale('pt-br');
dayjs.extend(localizedFormat);

export async function createTrip(app: FastifyInstance) {
    
    app.withTypeProvider<ZodTypeProvider>().post('/trips', {
        schema: {
            body: z.object({
                destination: z.string().min(4),
                starts_at: z.coerce.date(),
                ends_at: z.coerce.date(),
                owner_name: z.string(),
                owner_email: z.string().email(),
                emails_to_invite: z.array(z.string().email()),
            })
        }
    }, async (request) => {
        const { destination, starts_at, ends_at } = request.body;
        
        if (dayjs(starts_at).isBefore(new Date()))
            throw new Error("Start date must be in the future");
        
        if (dayjs(ends_at).isBefore(starts_at))
            throw new Error("End date must be after start date");

        const trip = await prisma.trip.create({
            data: {
                destination,
                starts_at,
                ends_at,
                participants: {
                    createMany: {
                        data: [
                            {
                                name: request.body.owner_name,
                                email: request.body.owner_email,
                                is_owner: true,
                                is_confirmed: true,
                            },
                            ...request.body.emails_to_invite.map(email => ({ 
                                email 
                            }))
                        ],
                    },
                }
            }
        });

        const formattedStartDate = dayjs(starts_at).format("LL");
        const formattedEndDate = dayjs(ends_at).format("LL");

        const confirmationLink = `http://localhost:3000/trips/${trip.id}/confirm`

        const mail = await getMailClient();

        const message = await mail.sendMail({
            from: {
                name: "Equipe Trip Planner",
                address: "oi@planner.com",
            },
            to: {
                name: request.body.owner_name,
                address: request.body.owner_email,
            },
            subject: `Confirme sua viagem para ${destination}`,
            html: `<div style="font-family: sans-serif; font-size: 16px; line-height: 1.6;">
                    <p>Você solicitou a criação de uma viagem para <strong>${destination}</strong> nas datas de <strong>${formattedStartDate} até ${formattedEndDate}</strong>.</p>
                    <p></p>
                    <p>Para confirmar sua viagem, clique no link abaixo:</p>
                    <p></p>
                    <p>
                        <a href="${confirmationLink}">Confirmar viagem</a>
                    </p>
                    <p></p>
                    <p>Caso você não saiba do que se trata esse e-mail, apenas ignore esse e-mail.</p>
                </div>`.trim()
        });

        console.log(nodemailer.getTestMessageUrl(message));

        return { tripId: trip.id };
    });

}