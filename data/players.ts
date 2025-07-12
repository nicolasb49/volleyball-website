export interface Player {
  id: string;
  name: string;
  position: string;
  image: string;
}

export const players: Player[] = [
  {
    id: '1',
    name: 'Alice Beispiel',
    position: 'Au\u00dfenangriff',
    image: 'https://via.placeholder.com/400x300?text=Alice',
  },
  {
    id: '2',
    name: 'Betty Beispiel',
    position: 'Zuspiel',
    image: 'https://via.placeholder.com/400x300?text=Betty',
  },
  {
    id: '3',
    name: 'Carla Beispiel',
    position: 'Mittelblock',
    image: 'https://via.placeholder.com/400x300?text=Carla',
  },
];
