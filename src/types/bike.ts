export interface Bike {
  id: number;
  title: string;
  serial: string;
  manufacturer_name: string;
  frame_model: string | null;
  year: number | null;
  frame_colors: string[];
  date_stolen: number | null;
  stolen_location: string | null;
  stolen_coordinates: [number, number] | null;
  thumb: string | null;
  large_img: string | null;
  url: string;
  status: string;
  stolen: boolean;
  description: string | null;
  propulsion_type_slug: string;
  cycle_type_slug: string;
}

export interface BikeSearchResponse {
  bikes: Bike[];
}

export interface BikeCountResponse {
  non: number;
  stolen: number;
  proximity: number;
  for_sale: number;
}

