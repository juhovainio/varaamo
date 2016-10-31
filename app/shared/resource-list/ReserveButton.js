import moment from 'moment';
import React, { PropTypes } from 'react';
import Button from 'react-bootstrap/lib/Button';
import { LinkContainer } from 'react-router-bootstrap';

import { getResourcePageUrl, reservingIsLimited } from 'utils/resourceUtils';

function ReserveButton({ date, isLoggedIn, resource }) {
  const now = moment();
  if (moment(date).isBefore(now, 'day')) {
    return <span />;
  }

  if (reservingIsLimited(resource, date)) {
    return <span />;
  }

  const isReservable = isLoggedIn && resource.reservable;
  let buttonText;

  if (isReservable) {
    buttonText = resource.needManualConfirmation ? 'Tee alustava varaus' : 'Varaa';
  } else {
    buttonText = 'Katso varaustilanne';
  }

  return (
    <LinkContainer to={getResourcePageUrl(resource, date)}>
      <Button bsStyle="primary">
        {buttonText}
      </Button>
    </LinkContainer>
  );
}

ReserveButton.propTypes = {
  date: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  resource: PropTypes.shape({
    needManualConfirmation: PropTypes.bool.isRequired,
    reservable: PropTypes.bool.isRequired,
    userPermissions: PropTypes.object.isRequired,
  }).isRequired,
};

export default ReserveButton;
