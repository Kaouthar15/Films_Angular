export interface ScreeningResponse {
  _embedded: {
    screenings: Screening[];
  };
  _links: {
    self: Link;
  };
}

export interface Screening {
  _links: {
    self: Link;
    screening: Link & { templated?: boolean };
    hall: Link;
    film: Link;
  };
  startTime: string; // ISO 8601 datetime string
  endTime: string; // ISO 8601 datetime string
  id: number;
  film: Film;
  hall: Hall;
}

export interface Film {
  createdAt: string; // ISO 8601 datetime string
  updatedAt: string; // ISO 8601 datetime string
  title: string;
  duration: number; // in minutes
  imageUrl: string;
  year: number; // release year
}

export interface Hall {
  createdAt: string; // ISO 8601 datetime string
  updatedAt: string; // ISO 8601 datetime string
  number: number; // hall number
  capacity: number; // seating capacity
}

export interface Link {
  href: string;
}
