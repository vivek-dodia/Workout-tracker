import React from 'react';
import { render } from '@testing-library/react';
import Loading from '../../components/Loading';


describe('Loading component', () => {
  it('renders loading text', () => {
    const { getByText } = render(<Loading loadingText="Loading data" />);
    const loadingTextElement = getByText(/Loading data.../i);
    expect(loadingTextElement).toBeInTheDocument();
  });

  it('renders default loading text if not provided', () => {
    const { getByText } = render(<Loading />);
    const loadingTextElement = getByText(/Loading.../i);
    expect(loadingTextElement).toBeInTheDocument();
  });

  it('renders logo and app name', () => {
    const { getByAltText, getByText } = render(<Loading />);
    const logoImage = getByAltText('logo');
    const appNameElement = getByText(/FitTrackerX/i);
    expect(logoImage).toBeInTheDocument();
    expect(appNameElement).toBeInTheDocument();
  });
});
