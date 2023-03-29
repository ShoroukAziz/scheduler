import React from 'react';
import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  waitForElementToBeRemoved,
  queryByText,
  queryByAltText,
  prettyDOM,
} from '@testing-library/react';
import axios from 'axios';
import Application from 'components/Application';

afterEach(cleanup);

describe('Application', () => {
  it('defaults to Monday and changes the schedule when a new day is selected', async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText('Monday'));
    fireEvent.click(getByText('Tuesday'));
    expect(getByText('Leopold Silvers')).toBeInTheDocument();
  });

  it('loads data, books an interview and reduces the spots remaining for Monday by 1', async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, 'Archie Cohen'));

    const appointment = getAllByTestId(container, 'appointment')[0];

    fireEvent.click(getByAltText(appointment, 'Add'));

    fireEvent.change(getByPlaceholderText(appointment, 'Enter Student Name'), {
      target: { value: 'Lydia Miller-Jones' },
    });

    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));

    fireEvent.click(getByText(appointment, 'Save'));

    expect(getByText(appointment, 'Saving...')).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getByText(appointment, 'Saving...'));

    expect(getByText(appointment, 'Lydia Miller-Jones')).toBeInTheDocument();

    const day = getAllByTestId(container, 'day').find((day) =>
      queryByText(day, 'Monday')
    );
    expect(getByText(day, 'no spots remaining')).toBeInTheDocument();
  });

  it('loads data, cancels an interview and increases the spots remaining for Monday by 1', async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, 'Archie Cohen'));

    const appointment = getAllByTestId(container, 'appointment').find(
      (appointment) => !queryByAltText(appointment, 'Add')
    );

    fireEvent.click(getByAltText(appointment, 'Delete'));

    expect(
      getByText(appointment, 'Are you sure you would like to delete?')
    ).toBeInTheDocument();

    fireEvent.click(getByText(appointment, 'Confirm'));

    expect(getByText(appointment, 'Deleting...')).toBeInTheDocument();

    await waitForElementToBeRemoved(() =>
      getByText(appointment, 'Deleting...')
    );

    expect(getByAltText(appointment, 'Add')).toBeInTheDocument();

    const day = getAllByTestId(container, 'day').find((day) =>
      queryByText(day, 'Monday')
    );
    expect(getByText(day, '2 spots remaining')).toBeInTheDocument();
  });

  it('loads data, edits an interview and keeps the spots remaining for Monday the same', async () => {
    const { debug, container } = render(<Application />);

    await waitForElement(() => getByText(container, 'Archie Cohen'));

    const appointment = getAllByTestId(container, 'appointment').find(
      (appointment) => !queryByAltText(appointment, 'Add')
    );

    fireEvent.click(getByAltText(appointment, 'Edit'));

    fireEvent.change(getByPlaceholderText(appointment, 'Enter Student Name'), {
      target: { value: 'Sara Carpenter' },
    });

    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));

    fireEvent.click(getByText(appointment, 'Save'));

    expect(getByText(appointment, 'Saving...')).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getByText(appointment, 'Saving...'));

    expect(getByText(appointment, 'Sara Carpenter')).toBeInTheDocument();

    const day = getAllByTestId(container, 'day').find((day) =>
      queryByText(day, 'Monday')
    );
    expect(getByText(day, '1 spot remaining')).toBeInTheDocument();
  });

  it('shows the save error when failing to save an appointment', async () => {
    axios.put.mockRejectedValueOnce();

    const { debug, container } = render(<Application />);

    await waitForElement(() => getByText(container, 'Archie Cohen'));

    const appointment = getAllByTestId(container, 'appointment')[0];

    fireEvent.click(getByAltText(appointment, 'Add'));

    fireEvent.change(getByPlaceholderText(appointment, 'Enter Student Name'), {
      target: { value: 'Lydia Miller-Jones' },
    });

    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));

    fireEvent.click(getByText(appointment, 'Save'));

    expect(getByText(appointment, 'Saving...')).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getByText(appointment, 'Saving...'));

    expect(
      getByText(appointment, 'Could not save appointment')
    ).toBeInTheDocument();

    fireEvent.click(getByAltText(appointment, 'Close'));

    expect(getByAltText(appointment, 'Add')).toBeInTheDocument();
  });

  it('shows the delete error when failing to save an appointment', async () => {
    axios.delete.mockRejectedValueOnce();

    const { debug, container } = render(<Application />);

    await waitForElement(() => getByText(container, 'Archie Cohen'));

    const appointment = getAllByTestId(container, 'appointment').find(
      (appointment) => !queryByAltText(appointment, 'Add')
    );

    fireEvent.click(getByAltText(appointment, 'Delete'));

    expect(
      getByText(appointment, 'Are you sure you would like to delete?')
    ).toBeInTheDocument();

    fireEvent.click(getByText(appointment, 'Confirm'));

    expect(getByText(appointment, 'Deleting...')).toBeInTheDocument();

    await waitForElementToBeRemoved(() =>
      getByText(appointment, 'Deleting...')
    );

    expect(
      getByText(appointment, 'Could not cancel appointment')
    ).toBeInTheDocument();

    fireEvent.click(getByAltText(appointment, 'Close'));

    expect(getByText(appointment, 'Archie Cohen')).toBeInTheDocument();
  });
});
