import { render, screen } from '@testing-library/react';
import Cards from '../components/cards/cards';

const mockMatch = {
  country: 'Mock Country',
  competition: 'Mock Competition',
  status: { type: 'finished' },
  homeScore: { current: 2 },
  awayScore: { current: 1 },
  homeTeam: { name: 'Home Team' },
  awayTeam: { name: 'Away Team' },
};

describe('Cards Component', () => {
  it('renders the component with the provided match data', () => {
    render(<Cards match={mockMatch} />);

    expect(screen.getByText((content, element) => {
      return content.toUpperCase() === 'MOCK COUNTRY';
    })).toBeInTheDocument();

    expect(screen.getByText('Mock Competition')).toBeInTheDocument();
    expect(screen.getByText('FINISHED')).toBeInTheDocument();
    expect(screen.getByText('2 - 1')).toBeInTheDocument();
    expect(screen.getByText('Home Team')).toBeInTheDocument();
    expect(screen.getByText('Away Team')).toBeInTheDocument();
  });

});
