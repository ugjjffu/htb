import { Dropdown } from 'antd';
import { CityGridProps } from './SelectHotCityGrid';
import { useDispatch } from 'react-redux';
import React from 'react';

interface CityGridWithLettersProps extends CityGridProps {
  letters: string[]; // same length & order as cityList
}

const CityWithFirstLetter: React.FC<CityGridWithLettersProps> = ({
  onSelectHotCity,
  selectedHotCity,
  cityList,
  width,
  letters,
}) => {
  const dispatch = useDispatch();

  /* ---------- group cities into rows (6 per row) ---------- */
  const rows: City[][] = [];
  for (let i = 0; i < cityList.length; i += 6) {
    rows.push(cityList.slice(i, i + 6));
  }

  return (
    <section className="grid grid-cols-6 pl-0 w-[590px] gap-y-2">
      {rows.map((row, rIdx) => (
        <React.Fragment key={rIdx}>
          {/* letter cell (first column) */}
          <span className="flex items-center justify-center font-semibold text-gray-600">
            {letters[rIdx]}
          </span>

          {/* city cells (remaining 5 columns) */}
          {row.map((city) => (
            <span
              key={'recommended' + city}
              className="h-8 border flex items-center justify-center cursor-pointer hover:border-blue-400"
              style={{ width: `${width}px` }}
              onClick={() => {
                onSelectHotCity(city);
                dispatch({ type: 'SET_SHOW_MORE_CITY_OF_PLACE_OF_DEPARTURE', payload: false });
              }}
            >
              {city}
            </span>
          ))}

          {/* fill empty columns if last row < 6 */}
          {Array.from({ length: 6 - row.length }).map((_, i) => (
            <span key={`empty-${rIdx}-${i}`} />
          ))}
        </React.Fragment>
      ))}
    </section>
  );
};

export default CityWithFirstLetter;