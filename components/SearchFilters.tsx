import { useState } from "react";
import Separator from "./Separator";

const valToTime = (val: number) => {
  if (val === 24) return `23:59`;
  if (val - Math.floor(val) === 0.5) {
    return `${Math.floor(val)}:30`;
  } else {
    return `${val}:00`;
  }
};

const airlines = [
  { id: 1, name: "Airline 1" },
  { id: 2, name: "Airline 2" },
  { id: 3, name: "Airline 3" },
];

const SearchFilters = () => {
  const maxTotalDuration = 100;
  const [totalDuration, setTotalDuration] = useState(maxTotalDuration);
  const [segments, setSegments] = useState([{}, {}, {}]);
  const [segmentValues, setSegmentValues] = useState([
    { min: 0, max: 24 },
    { min: 0, max: 24 },
    { min: 0, max: 24 },
  ]);

  const [airlinesSelected, setAirlinesSelected] = useState(
    airlines.map((a) => a.id)
  );

  return (
    <div className="min-h-full bg-foreground-opposite w-[270px] rounded-md p-3 py-6 flex flex-col gap-6 items-center justify-start">
      <h3 className="text-2xl font-bold">Filters</h3>

      <div className="flex flex-col items-center justify-center w-full px-1 gap-3">
        <div className="w-full flex flex-col gap-2">
          <h4 className="text-xl font-semibold">Max Total Duration</h4>
          <p>
            {totalDuration === maxTotalDuration
              ? "No limit"
              : `${totalDuration} hours`}
          </p>
          <input
            type="range"
            className="w-full"
            value={totalDuration}
            min={0}
            max={100}
            step={0.5}
            onChange={(e) => setTotalDuration(parseFloat(e.target.value))}
          />
        </div>

        <Separator horizontal={true} />

        <div className="w-full flex flex-col gap-2">
          <h4 className="text-xl font-semibold">Departure Times</h4>
          <div className="flex flex-col gap-4">
            {segments.map((segment, s) => (
              <div
                key={"segment-departure-time-filter-" + s}
                className="flex flex-col gap-2"
              >
                <div className="">
                  <h4>Segment {s}:</h4>
                  <p>
                    {valToTime(segmentValues[s].min)} -{" "}
                    {valToTime(segmentValues[s].max)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <label htmlFor="">Min</label>
                  <input
                    type="range"
                    className="w-full"
                    value={segmentValues[s].min}
                    min={0}
                    max={segmentValues[s].max}
                    step={0.5}
                    onChange={(e) =>
                      setSegmentValues(
                        segmentValues.map((a, i) =>
                          i === s
                            ? { ...a, min: parseFloat(e.target.value) }
                            : a
                        )
                      )
                    }
                  />
                </div>

                <div className="flex gap-2">
                  <label htmlFor="">Max</label>
                  <input
                    type="range"
                    className="w-full"
                    value={segmentValues[s].max}
                    min={segmentValues[s].min}
                    max={24}
                    step={0.5}
                    onChange={(e) =>
                      setSegmentValues(
                        segmentValues.map((a, i) =>
                          i === s
                            ? { ...a, max: parseFloat(e.target.value) }
                            : a
                        )
                      )
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator horizontal={true} />

        <div className="w-full flex flex-col gap-2">
          <h4 className="text-xl font-semibold">Airlines</h4>
          {airlines.map((airline, i) => (
            <div key={"airline-filter-" + airline.id} className="flex gap-2">
              <input
                type="checkbox"
                name=""
                id=""
                checked={airlinesSelected.includes(airline.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setAirlinesSelected([...airlinesSelected, airline.id]);
                  } else {
                    setAirlinesSelected(
                      airlinesSelected.filter((a) => a !== airline.id)
                    );
                  }
                }}
              />
              <label htmlFor="">{airline.name}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
