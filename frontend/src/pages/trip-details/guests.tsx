import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../components/button";
import { api } from "../../lib/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Participant {
    id: string;
    name: string | null;
    email: string;
    is_confirmed: boolean;
}

export function Guests() {
    const { tripId } = useParams();
    const [ participants, setParticipants ] = useState<Participant[] | undefined>([]);

    useEffect(() => {
        api.get(`/trips/${tripId}/participants`).then(response => setParticipants(response.data.participants));
    }, [tripId]);

    const length = participants ? participants.length : 0;

    return (
        <div className="space-y-6">
            <h2 className="font-semibold text-xl">Convidados</h2>
            
            <div className="space-y-5">
                { length > 0 ? (
                    participants?.map((participant, index) => {
                        return (
                            <div key={participant.id} className="flex items-center justify-between gap-4">
                                <div className="space-y-1.5 flex-1">
                                    <span className="block font-medium text-zinc-100">{ participant.name ?? `Convidado ${index}`}</span>
                                    <span className="block text-sm text-zinc-400 truncate">
                                        { participant.email }
                                    </span>
                                </div>
    
                                { participant.is_confirmed ? (
                                    <CheckCircle2 className="size-5 shrink-0 text-green-400 " />
                                ) : (
                                    <CircleDashed className="text-zinc-400" />
                                )}
                            </div>
                        );
                    })
                ) : (
                    <p className="text-zinc-500 text-sm">
                        Nenhum convidado cadastrado nessa viagem.
                    </p>
                )}
            </div>

            <Button variant="secundary" size="full">
                Gerenciar convidados
                <UserCog className="size-5" />
            </Button>

            
        </div>
    );
}