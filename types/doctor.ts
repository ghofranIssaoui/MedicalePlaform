// l interface ta3 e doctor nesta3mlouha besh e next yet3aref 3al 
// prop(name,image,location....)eli jeyin mel db sous forme doctor model(structure l tab doctors fel db)
//
//ki yji objet doctor mel db n7awlouh ll interface hedhi besh e next yet3aref 3al prop
export interface DoctorType {
    _id: string;
    name: string;
    specialty: string;
    subSpecialty: string;
    location: string;
    rating: number;
    reviews: number;
    image: string;
    about: string;
    education: {
      degree: string;
      institution: string;
      year: string;
    }[];
    languages: string[];
    insurances: string[];
    availableDates: {
      date: string;
      slots: string[];
    }[];
    consultationFee: number;
  }
  