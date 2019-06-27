import React, { memo } from 'react';
import ReactTooltip from 'react-tooltip';

const FormInputValidation = props => (
  <div className="form-control">
    <label htmlFor={props.id}>{props.label}</label>
    <input
      id={props.id}
      type={props.type}
      className={props.isValid ? '' : 'invalid'}
      value={props.value}
      placeholder={props.placeholder}
      onChange={props.handleChange}
      data-tip
      data-for={props.tooltipId}
    />
    {!props.isValid && (
      <ReactTooltip
        id={props.tooltipId}
        type="error"
        effect="solid"
        place="right"
      >
        {props.content}
      </ReactTooltip>
    )}
  </div>
);

export default memo(FormInputValidation);
