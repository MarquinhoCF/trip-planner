import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InviteGuestsModal } from './invite-guests-modal';
import { ConfirmTripModal } from './confirm-trip-modal';
import { DestinationAndDateStep } from './steps/destination-and-date-step';
import { InviteGuestsStep } from './steps/invite-guests-step';
import { DateRange } from 'react-day-picker';
import { api } from '../../lib/axios';

export function CreateTripPage() {
  const navigate = useNavigate();

  const [ isGuestsInputOpen, setIsGuestsInputOpen ] = useState(false);
  const [ isGuestsModalOpen, setIsModalInputOpen ] = useState(false);
  const [ isConfirmedModalOpen, setIsConfirmedModalOpen ] = useState(false);
  
  const [ destination, setDestination ] = useState("");
  const [ ownerName, setOwnerName ] = useState("");
  const [ ownerEmail, setOwnerEmail ] = useState("");
  const [ eventStartAndEndDates, setEventStartAndEndDates ] = useState<DateRange | undefined>(undefined);

  const [ emailsToInvite, setEmailsToInvite ] = useState([
    'marcos13cf@gmail.com',
    'john@acme.com',
  ]);

  const [isLoading, setIsLoading] = useState(false); // Estado de loading

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

    console.log(email);

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

  async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log(destination, ownerName, ownerEmail, eventStartAndEndDates, emailsToInvite);
    
    if (!destination)
      return;

    if (!eventStartAndEndDates?.from || !eventStartAndEndDates?.to)
      return;

    if (emailsToInvite.length === 0)
      return;

    if (!ownerName || !ownerEmail)
      return;

    setIsLoading(true);

    try {
      const response = await api.post('/trips', {
        destination: destination,
        owner_name: ownerName,
        owner_email: ownerEmail,
        starts_at: eventStartAndEndDates.from,
        ends_at: eventStartAndEndDates.to,
        emails_to_invite: emailsToInvite,
      });

      const { tripId } = response.data;

      navigate(`/trips/${tripId}`);
    } finally {
      setIsLoading(false);
    }
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
          <DestinationAndDateStep 
            isGuestsInputOpen={isGuestsInputOpen}
            openGuestsInput={openGuestsInput}
            closeGuestsInput={closeGuestsInput}
            setDestination={setDestination}
            eventStartAndEndDates={eventStartAndEndDates}
            setEventStartAndEndDates={setEventStartAndEndDates}
          />
          
          { isGuestsInputOpen && (
            <InviteGuestsStep
              openGuestsModal={openGuestsModal}
              openConfirmTripModal={openConfirmTripModal}
              emailsToInvite={emailsToInvite}
            />
          )}
        </div>

        <p className="text-small text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
          com os <a className="text-zinc-300 underline" href="#">termos de uso</a> e <a className="text-zinc-300 underline" href="#">políticas de privacidade</a>.
        </p>
      </div>

      {isGuestsModalOpen && (
        <InviteGuestsModal 
          emailsToInvite={emailsToInvite}
          addNewEmailToInvite={addNewEmailToInvite}
          removeEmailFromInvite={removeEmailFromInvite}
          closeGuestsModal={closeGuestsModal}
        />
      )}

      {isConfirmedModalOpen && (
        <ConfirmTripModal 
          closeConfirmTripModal={closeConfirmTripModal}
          createTrip={createTrip}
          setOwnerName={setOwnerName}
          setOwnerEmail={setOwnerEmail}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}