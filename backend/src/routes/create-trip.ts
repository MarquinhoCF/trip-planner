import fastify, { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { prisma } from "../lib/prisma";
import dayjs from 'dayjs';
import { getMailClient } from "../lib/mail";
import nodemailer from 'nodemailer';

export async function createTrip(app: FastifyInstance) {
    
    app.withTypeProvider<ZodTypeProvider>().post('/trips', {
        schema: {
            body: z.object({
                destination: z.string().min(4),
                starts_at: z.coerce.date(),
                ends_at: z.coerce.date(),
                owner_name: z.string(),
                owner_email: z.string().email(),
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
            }
        });

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
            subject: "Testando envio de email",
            html: `<p>Olá ${request.body.owner_name}, sua viagem para ${destination} foi criada com sucesso!</p>`
        });

        console.log(nodemailer.getTestMessageUrl(message));

        return { tripId: trip.id };
    });

}