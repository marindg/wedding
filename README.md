# wedding

<!-- authentification -->

Un site internet générique est créé avec un lien de connection :

- le mot de passe renvoie un retour : creation de compte => l'utilisateur est renvoyé vers create Login avec un token
- le mot de passe renvoie un retour : already in database => l'utilisateur est renvoyé sur la page du mariage avec un token
- le mot de passe renvoue un retour : mot de passe inconnu => l'utilisateur ne peut pas aller plus loin
  A partir de là, chaque requête en base nécessite un token

Les menus du site du mariage :

- Adresse : carte interactive des différents évènements
- Planning : emploi du temps du mariage
- Table : listing des tables du repas et la liste des utilisateurs qui se complète
- Menu : liste des plats
- Contact : coordonnées des différents tiers (mariés, témoins, mairie, hôtels...)
- Photos : caroussel de photos
- utilisateur : détail des invités qui sont rattachés à son compte utilisateur
- Admin(AdminAccount only) : exporter les données, mettre à jour des informations, communiquer avec les invités

Schéma des données :

User {
login: string;
loginLogs: ILoginLogs[];
isAdmin: boolean;
guest: IGuest[];
activate: boolean;
creationDate: Date;
}

LoginLogs {
date: Date;
country: string;
ip: string;
device: string;
browser: string;
}

Guest {
firstName: string;
lastName: string;
mail: string;
phone: string;
address: IAddress;
diet: string;
present: boolean;
comment: string;
birthDate: Date;
}

Address {
country: string;
postalCode: string;
postalStreet: string;
postalNum: string;
postalPlus?: string;
}

Contact {
name: string;
phone: string | null;
availability: string | null;
mail: string | null;
comment?: string;
}

Service {
code: number;
status: string;
message: string | object;
}

Wedding {
name: string;
mainDate: string;
mainPicture: string;
descriptionSmall: string;
descriptionBig: string;
events: IEvents[];
schedule: ISchedule[];
tables: ITable[];
menu: IMenu[];
drink: IDrink[];
contacts: IContact[];
pictures: string[];
}

Events {
name: string;
startDate: Date;
endDate: Date;
address: IEventAddress;
contact: IContact;
pictures?: string[];
icons?: string;
}

EventAddress extends Address {
lat: string;
lon: string;
}

Schedule {
startDate: string;
endDate: string;
name: string;
desc: string;
pictures?: string[];
icons?: string;
}

Table {
emplacement: string;
name: string;
comment?: string;
guests: string[];
}

Menu {
diet: string;
name: string;
category: string;
order: number;
}

Drink {
alcool: boolean;
name: string;
order: number;
}
