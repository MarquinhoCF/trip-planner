import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { CreateLinkModal } from "./create-link-modal";

interface Link {
    id: string;
    title: string;
    url: string;
}

export function ImportantLinks() {
    const [ isOpenCreateLinkModal, setIsOpenCreateLinkModal ] = useState(false);

    const { tripId } = useParams();
    const [ links, setLinks ] = useState<Link[] | undefined>([]);

    useEffect(() => {
        api.get(`/trips/${tripId}/links`).then(response => setLinks(response.data.links));
    }, [tripId]);

    const length = links ? links.length : 0;

    function openCreateLinkModela() {
        setIsOpenCreateLinkModal(true);
    }

    function closeCreateLinkModal() {
        setIsOpenCreateLinkModal(false);
    }

    return (
        <div className="space-y-6">
            <h2 className="font-semibold text-xl">Links Importantes</h2>
            
            <div className="space-y-5">
                { length > 0 ? (
                    links?.map(link => (
                        <div key={link.id} className="flex items-center justify-between gap-4">
                            <div className="space-y-1.5 flex-1">
                                <span className="block font-medium text-zinc-100">{link.title}</span>
                                <a href={link.url} className="block text-xs text-zinc-400 truncate hover:text-zinc-200">
                                    {link.url}
                                </a>
                            </div>

                            <Link2 className="text-zinc-400" />
                        </div>
                    ))
                ) : (
                    <p className="text-zinc-500 text-sm">
                        Nenhum link cadastrado nessa viagem.
                    </p>
                )}
            </div> 

            <Button onClick={openCreateLinkModela} variant="secundary" size="full">
                Cadastrar novo link
                <Plus className="size-5" />
            </Button>

            { isOpenCreateLinkModal && (
                <CreateLinkModal
                    closeCreateLinkModal={closeCreateLinkModal}
                />
            )}
        </div>
    );
}