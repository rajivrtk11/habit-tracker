import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

const GoalComponent = () => {
    const [selectedRange, setSelectedRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });

    const handleDateSelect = (ranges) => {
        // Update the selected date range in state
        setSelectedRange(ranges.selection);
    }

    return (
        <form>
            <div className="row g-3 align-items-center mb-2">
                <div className="col-auto">
                    <label htmlFor="inputPassword6" className="col-form-label">Description</label>
                </div>
                <div className="col-4">
                    <input type="password" id="inputPassword6" className="form-control" aria-describedby="passwordHelpInline" />
                </div>
            </div>
            <div className="row g-3 align-items-center ">
                <div className="col-auto">
                    <label htmlFor="inputPassword6" className="col-form-label">Select Goal Duration</label>
                </div>
                <div className="col-4">
                    <DateRange
                        ranges={[selectedRange]}
                        onChange={handleDateSelect}
                        editableDateInputs={true}
                        moveRangeOnFirstSelection={false}
                        minDate={new Date()}
                        showSelectionPreview={true}
                    />
                </div>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default GoalComponent;
