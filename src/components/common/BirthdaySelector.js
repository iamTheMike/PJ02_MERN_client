import React from 'react';

const BirthdatePicker = React.forwardRef(({ value, onClick }, ref) => {
    return (
        <div className="content-box" onClick={onClick} style={{ cursor: 'pointer' }}>
            <input
                type="text"
                className="date-form"
                value={value} 
                readOnly 
                ref={ref} 
            />
            <div className="calendar-box">
                <i className="bx bx-calendar"></i>
            </div>
        </div>
    );
});

export default  BirthdatePicker;