export const PROCESS_NOTES: Record<'ro' | 'en', Record<string, { client: string; checkpoint: string }>> = {
  ro: {
    '01': { client: 'Ne spui ce trebuie să rezolve produsul și ce buget ai în vedere.', checkpoint: 'Nevoia și prioritățile sunt clare înainte să definim soluția.' },
    '02': { client: 'Discutăm fluxurile și interfața înainte să intrăm în dezvoltare.', checkpoint: 'Soluția propusă acoperă funcțiile agreate și are un plan de implementare.' },
    '03': { client: 'Încerci versiunile de lucru și ne dai feedback pe funcțiile construite.', checkpoint: 'Progresul este vizibil în demo-uri, iar observațiile sunt discutate pe parcurs.' },
    '04': { client: 'Confirmi că fluxurile importante reflectă modul în care vei folosi produsul.', checkpoint: 'Verificăm cazurile de eroare și regulile de acces; remediem problemele din scopul agreat.' },
    '05': { client: 'Primești acces și instrucțiuni pentru a folosi și administra produsul.', checkpoint: 'Produsul este publicat în mediul agreat și verificăm disponibilitatea.' },
    '06': { client: 'Ne spui unde ai nevoie de ajutor și semnalezi erorile întâlnite în produsul livrat.', checkpoint: 'Suportul gratuit timp de un an include ajutor la utilizare și remedierea erorilor. Funcționalitățile noi se discută separat.' },
  },
  en: {
    '01': { client: 'Tell us what the product needs to solve and the budget you have in mind.', checkpoint: 'The need and priorities are clear before we define the solution.' },
    '02': { client: 'We discuss the workflows and interface before starting development.', checkpoint: 'The proposed solution covers the agreed features and has an implementation plan.' },
    '03': { client: 'Try working versions and give feedback on the features we build.', checkpoint: 'Demos make progress visible, and we discuss feedback along the way.' },
    '04': { client: 'Confirm that the main workflows reflect how you will use the product.', checkpoint: 'We check error cases and access rules, and fix issues within the agreed scope.' },
    '05': { client: 'Receive access and instructions to use and administer the product.', checkpoint: 'The product is published in the agreed environment and we check its availability.' },
    '06': { client: 'Tell us where you need help and report issues in the delivered product.', checkpoint: 'One year of free support includes usage help and bug fixes. New features are discussed separately.' },
  },
};
