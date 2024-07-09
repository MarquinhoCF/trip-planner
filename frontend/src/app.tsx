import { MapPin, Calendar, ArrowRight, UserRoundPlus, Settings2, X, AtSign, Plus, User } from 'lucide-react'
import { FormEvent, useState } from 'react';

export function App() {
  const [ isGuestsInputOpen, setIsGuestsInputOpen ] = useState(false);
  const [ isGuestsModalOpen, setIsModalInputOpen ] = useState(false);
  const [ isConfirmedModalOpen, setIsConfirmedModalOpen ] = useState(false);
  const [ emailsToInvite, setEmailsToInvite ] = useState([
    'marcos13cf@gmail.com',
    'john@acme.com',
  ]);

  function openGuestsInput() {
    setIsGuestsInputOpen(true);
  }

  function closeGuestsInput() {
    setIsGuestsInputOpen(false);
  }

  function openGuestsModal() {
    setIsModalInputOpen(true);
  }

  function closeGuestsModal() {
    setIsModalInputOpen(false);
  }

  function openConfirmTripModal() {
    setIsConfirmedModalOpen(true);
  }

  function closeConfirmTripModal() {
    setIsConfirmedModalOpen(false);
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const email = data.get('email')?.toString();

    if (!email) {
      return;
    }

    if (emailsToInvite.includes(email)) {
      return;
    }

    setEmailsToInvite([
      ...emailsToInvite,
      email
    ]);

    event.currentTarget.reset();
  }

  function removeEmailFromInvite(email: string) {
    const newEmailList = emailsToInvite.filter(emailToRemove => emailToRemove !== email);

    setEmailsToInvite(newEmailList);
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-full px-6 text-center space-y-10">
        <div className='flex flex-col items-center gap-3'>
          <img src="/Logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>

        <div className='space-y-4'>
          <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <div className='flex items-center gap-2 flex-1'>
              <MapPin className="size-5 text-zinc-400" />
              <input disabled={isGuestsInputOpen} type="text" placeholder="Para onde você vai?" className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" />
            </div>

            <div className='flex items-center gap-2'>
              <Calendar className="size-5 text-zinc-400" />
              <input disabled={isGuestsInputOpen} type="text" placeholder="Quando?" className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none" />
            </div>

            <div className='w-px h-6 bg-zinc-800'></div>

            { isGuestsInputOpen ? (
              <button onClick={closeGuestsInput} className='bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-zinc-700'>
                Alterar local/data
                <Settings2 className="size-5" />
              </button>
            ) : (
              <button onClick={openGuestsInput} className='bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400' >
                Continuar
                <ArrowRight className="size-5" />
              </button>
            )}

          </div>
          
          { isGuestsInputOpen && (
            <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
              <button type="button" onClick={openGuestsModal} className='flex items-center gap-2 flex-1'>
                <UserRoundPlus className="size-5 text-zinc-400" />
                {emailsToInvite.length > 0 ? (
                  <span className='text-zinc-100 text-lg flex-1 text-left'>
                    {emailsToInvite.length} pessoa{emailsToInvite.length > 1 ? 's' : ''} convidada{emailsToInvite.length > 1 ? 's' : ''}
                  </span>
                ) : (
                  <span className='text-zinc-400 text-lg flex-1 text-left'>Quem estará na viagem?</span>
                )}
                
              </button>

              <div className='w-px h-6 bg-zinc-800'></div>

              <button onClick={openConfirmTripModal} className='bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400' >
                Confirmar imagem
                <ArrowRight className="size-5" />
              </button>
            </div>
          )}
        </div>

        <p className="text-small text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
          com os <a className="text-zinc-300 underline" href="#">termos de uso</a> e <a className="text-zinc-300 underline" href="#">políticas de privacidade</a>.
        </p>
      </div>

      {isGuestsModalOpen && (
        <div className='fixed inset-8 bg-black/60 flex items-center justify-center'>
          <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <h2 className='text-lg font-semibold'>Selecionar convidados</h2>
                <button>
                  <X onClick={closeGuestsModal} className='size-5 bg-xinc-400' />
                </button>
              </div>

              <p className='text-sm text-zinc-400'>Os convidados irão receber e-mails para confirmar a participação na viagem.</p>
            </div>

            <div className='flex flex-wrap gap-2'>
              { emailsToInvite.map(email => (
                <div key={email} className='py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2'>
                  <span className='text-zinc-300'>{email}</span>
                  <button type='button' onClick={() => removeEmailFromInvite(email)}>
                    <X className='size-4 text-zinc-400'/>
                  </button>
                </div>
              ))}
            </div>

            <div className='w-full h-px bg-zinc-800' />

            <form onSubmit={addNewEmailToInvite} className='p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2' action="">
              <div className='px-2 flex items-center flex-1 gap-2'>
                <AtSign className='text-zinc-400 size-5' />
                <input 
                  type="email" 
                  name='email' 
                  placeholder="Digite o email do convidado?" 
                  className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" 
                />
              </div>
              
              <button className='bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400' >
                Convidar
                <Plus className="size-5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {isConfirmedModalOpen && (
        <div className='fixed inset-8 bg-black/60 flex items-center justify-center'>
          <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <h2 className='text-lg font-semibold'>Confirmar criação de viagem</h2>
                <button>
                  <X onClick={closeConfirmTripModal} className='size-5 bg-xinc-400' />
                </button>
              </div>

              <p className='text-sm text-zinc-400'>
                Para concluir a criação da viagem para <span className='font-semibold text-zinc-100'>Florianópolis, Brasil</span> nas datas de <span className='font-semibold text-zinc-100'>16 a 27 de Agosto de 2024</span> preencha seus dados abaixo:
              </p>
            </div>

            <form onSubmit={addNewEmailToInvite} className="space-y-3" action="">
              <div className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
                <User className='text-zinc-400 size-5' />
                <input 
                  type="text" 
                  name='name' 
                  placeholder="Seu nome completo" 
                  className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" 
                />
              </div>

              <div className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
                <User className='text-zinc-400 size-5' />
                <input 
                  type="email" 
                  name='email' 
                  placeholder="Seu e-mail pessoal" 
                  className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" 
                />
              </div>
              
              <button className='bg-lime-300 w-full justify-center text-lime-950 rounded-lg px-5 h-11 font-medium flex items-center gap-2 hover:bg-lime-400' >
                Confirmar criação da viagem
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}