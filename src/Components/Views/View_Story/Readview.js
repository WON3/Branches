import React from 'react';

import './View_Story.css'


function Readview(props) {
  const { classes, contribution } = props;
  return (
    <div className="zzz">
      <p style={{ display: "inline" }}>
        {contribution.contribution}
      </p>
    </div>
  );
}

export default (Readview);