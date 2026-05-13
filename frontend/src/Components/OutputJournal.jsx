import { useContext, useState } from "react";
import { AppContext } from "../config/AppContext";

function OutputJournal({ job }) {
  const { user } = useContext(AppContext);
  const [form, setForm] = useState({
    No: job.No,
    docNo: "",
    lineNo: "",
    RPONo: job.ProdOrderNo,
    userName: user.name,
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    scrapCode: "",
    scrapQnt: "",
    downDate: "",
    downstartTime: "",
    downEndTime: "",
    downReason: "",
    setupTime: "",
    runTime: "",
    output: "",
    user: user.id,
  });

  const timeToMinutes = (time) => {
    if (!time) return null;

    const [hours, minutes] = time.split(":").map(Number);
    if (Number.isNaN(hours) || Number.isNaN(minutes)) return null;

    return hours * 60 + minutes;
  };

  const calculateRunTime = ({
    startDate,
    endDate,
    startTime,
    endTime,
    setupTime,
  }) => {
    const startMinutes = timeToMinutes(startTime);
    const endMinutes = timeToMinutes(endTime);

    if (startMinutes === null || endMinutes === null) return "";

    if (
      startDate &&
      endDate &&
      startDate === endDate &&
      endMinutes <= startMinutes
    ) {
      alert("end time must be after start time when both dates are the same");
      return "";
    }

    const setupMinutes = Number(setupTime) || 0;
    const elapsedMinutes =
      endMinutes >= startMinutes
        ? endMinutes - startMinutes
        : endMinutes + 24 * 60 - startMinutes;

    return Math.max(elapsedMinutes - setupMinutes, 0);
  };

  const formatTimeForJournal = (time) => {
    if (!time) return "";

    const [hoursValue, minutesValue = "0", secondsValue = "0"] =
      time.split(":");
    const hours = Number(hoursValue);
    const minutes = Number(minutesValue);
    const seconds = Number(secondsValue);

    if (Number.isNaN(hours) || Number.isNaN(minutes) || Number.isNaN(seconds)) {
      return time;
    }

    const period = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    const displayMinutes = String(minutes).padStart(2, "0");
    const displaySeconds = String(seconds).padStart(2, "0");

    return `${displayHours}:${displayMinutes}:${displaySeconds} ${period}`;
  };

  const [scrapList, setScrapList] = useState([
    { code: "", description: "", qty: "" },
  ]);

  const [downTimeList, setDownTimeList] = useState([
    { date: "", start: "", end: "", category: "Breakdown", description: "" },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((cur) => {
      const nextForm = {
        ...cur,
        [name]: value,
      };

      if (["startTime", "endTime", "setupTime"].includes(name)) {
        nextForm.runTime = calculateRunTime(nextForm);
      }

      return nextForm;
    });
  };

  const addScrapLine = () => {
    setScrapList((currentList) => [
      ...currentList,
      { code: "", description: "", qty: "" },
    ]);
  };

  const updateScrap = (index, field, value) => {
    setScrapList((currentList) =>
      currentList.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    );
  };

  const addDownTime = () => {
    setDownTimeList((currentList) => [
      ...currentList,
      {
        date: "",
        start: "",
        end: "",
        category: "Breakdown",
        description: "",
      },
    ]);
  };

  const updateDownTime = (index, field, value) => {
    setDownTimeList((currentList) =>
      currentList.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    );
  };

  const handleSubmit = () => {
    const journal = {
      documentNo: job.documentNo ?? "",
      lineNo: job.lineNo ?? "",
      productionOrderNo: job.ProdOrderNo,
      sourceNo: job.SourceNo ?? "",
      machineNo: job.No ?? "",
      ...form,
      startTime: formatTimeForJournal(form.startTime),
      endTime: formatTimeForJournal(form.endTime),
      scrapList,
      downTimeList,
    };

    console.log(journal);
    alert("Output posted");
  };

  return (
    <div className="output-journal-content">
      <section className="output-journal-summary">
        <div className="output-journal-summary-card output-journal-summary-hero">
          <span className="output-journal-summary-label">Production Order</span>
          <strong className="output-journal-summary-value">
            {job.ProdOrderNo}
          </strong>
          <p className="output-journal-summary-copy">
            {job.SourceDescription || "No item description available"}
          </p>
        </div>

        <div className="output-journal-summary-card">
          <span className="output-journal-summary-label">Source No.</span>
          <strong className="output-journal-summary-value">
            {job.SourceNo || "--"}
          </strong>
        </div>
      </section>

      <section className="output-journal-section">
        <div className="output-journal-section-header">
          <div>
            <p className="output-journal-section-eyebrow">Production Entry</p>
            <h2>Output Details</h2>
          </div>
        </div>

        <div className="output-journal-grid">
          <label className="output-journal-field">
            <span>Start Date</span>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
            />
          </label>

          <label className="output-journal-field">
            <span>End Date</span>
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
            />
          </label>

          <label className="output-journal-field">
            <span>Start Time</span>
            <input
              type="time"
              name="startTime"
              value={form.startTime}
              onChange={handleChange}
            />
          </label>

          <label className="output-journal-field">
            <span>End Time</span>
            <input
              type="time"
              name="endTime"
              value={form.endTime}
              onChange={handleChange}
            />
          </label>

          <label className="output-journal-field">
            <span>Setup Time</span>
            <input
              type="number"
              name="setupTime"
              value={form.setupTime}
              onChange={handleChange}
              placeholder="Minutes"
            />
          </label>

          <label className="output-journal-field">
            <span>Run Time</span>
            <input
              type="number"
              name="runTime"
              value={form.runTime}
              readOnly
              placeholder="run time"
            />
          </label>

          {/* <label className='output-journal-field'>
						<span>Scrap Code</span>
						<input
							type='number'
							name='scrapCode'
							value={form.scrapCode}
							onChange={handleChange}
							placeholder='Scrap code'
						/>
					</label> */}

          {/* <label className='output-journal-field'>
						<span>Scrap Qnt</span>
						<input
							type='number'
							name='scrapQnt'
							value={form.scrapQnt}
							onChange={handleChange}
							placeholder='Scrap quantity'
						/>
					</label> */}

          {/* <label className='output-journal-field'>
						<span>Down Date</span>
						<input
							type='date'
							name='downDate'
							value={form.downDate}
							onChange={handleChange}
							placeholder='Down Date'
						/>
					</label> */}

          {/* <label className='output-journal-field'>
						<span>Down Start Time</span>
						<input
							type='time'
							name='downStartTime'
							value={form.downStartTime}
							onChange={handleChange}
							placeholder='Down Start Time'
						/>
					</label> */}

          {/* <label className='output-journal-field'>
						<span>Down End Time</span>
						<input
							type='time'
							name='downEndTime'
							value={form.downEndTime}
							onChange={handleChange}
							placeholder='Down End Time'
						/>
					</label> */}

          <label className="output-journal-field">
            <span>Output Qty</span>
            <input
              type="number"
              name="outputQty"
              value={form.outputQty}
              onChange={handleChange}
              placeholder="Output produced quantity"
            />
          </label>

          <label className="output-journal-field">
            <span>Reason</span>
            <select name="reason" value={form.reason} onChange={handleChange}>
              <option value="">Select Reason</option>
              <option value="None">None</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </label>
        </div>
      </section>

      <section className="output-journal-section">
        <div className="output-journal-section-header">
          <div>
            <p className="output-journal-section-eyebrow">Quality Tracking</p>
            <h2>Scrap / Rejection</h2>
          </div>

          <button
            type="button"
            className="output-journal-secondary-button"
            onClick={addScrapLine}
          >
            Add Scrap Line
          </button>
        </div>

        <div className="output-journal-stack">
          {scrapList.map((item, index) => (
            <div key={`scrap-${index}`} className="output-journal-row-card">
              <label className="output-journal-field">
                <span>Scrap Code</span>
                <input
                  value={item.code}
                  onChange={(event) =>
                    updateScrap(index, "code", event.target.value)
                  }
                  placeholder="Enter scrap code"
                />
              </label>

              <label className="output-journal-field output-journal-field-wide">
                <span>Description</span>
                <input
                  value={item.description}
                  onChange={(event) =>
                    updateScrap(index, "description", event.target.value)
                  }
                  placeholder="Describe the rejection"
                />
              </label>

              <label className="output-journal-field">
                <span>Quantity</span>
                <input
                  type="number"
                  value={item.qty}
                  onChange={(event) =>
                    updateScrap(index, "qty", event.target.value)
                  }
                  placeholder="Qty"
                />
              </label>
            </div>
          ))}
        </div>
      </section>

      <section className="output-journal-section">
        <div className="output-journal-section-header">
          <div>
            <p className="output-journal-section-eyebrow">Machine Tracking</p>
            <h2>Down Time</h2>
          </div>

          <button
            type="button"
            className="output-journal-secondary-button"
            onClick={addDownTime}
          >
            Add Down Time
          </button>
        </div>

        <div className="output-journal-stack">
          {downTimeList.map((item, index) => (
            <div key={`down-${index}`} className="output-journal-row-card">
              <label className="output-journal-field">
                <span>Date</span>
                <input
                  type="date"
                  value={item.date}
                  onChange={(event) =>
                    updateDownTime(index, "date", event.target.value)
                  }
                />
              </label>

              <label className="output-journal-field">
                <span>Start</span>
                <input
                  type="time"
                  value={item.start}
                  onChange={(event) =>
                    updateDownTime(index, "start", event.target.value)
                  }
                />
              </label>

              <label className="output-journal-field">
                <span>End</span>
                <input
                  type="time"
                  value={item.end}
                  onChange={(event) =>
                    updateDownTime(index, "end", event.target.value)
                  }
                />
              </label>

              <label className="output-journal-field">
                <span>Category</span>
                <select
                  value={item.category}
                  onChange={(event) =>
                    updateDownTime(index, "category", event.target.value)
                  }
                >
                  <option value="Breakdown">Breakdown</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </label>

              <label className="output-journal-field output-journal-field-wide">
                <span>Description</span>
                <input
                  value={item.description}
                  onChange={(event) =>
                    updateDownTime(index, "description", event.target.value)
                  }
                  placeholder="Describe the issue"
                />
              </label>
            </div>
          ))}
        </div>
      </section>

      <div className="output-journal-actions">
        <button
          type="button"
          className="output-journal-primary-button"
          onClick={handleSubmit}
        >
          Post Output
        </button>
      </div>
    </div>
  );
}

export default OutputJournal;
