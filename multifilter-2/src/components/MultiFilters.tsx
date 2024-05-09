import { useState } from "react";
import { cars } from "../carItems";
import "./styles.css";

const MultiFilters = () => {
  const [selectedCarBrands, setSelectedCarBrands] = useState<string[]>([]);
  const [brandCheckboxValue, setBrandCheckboxValue] = useState<boolean[]>(
    Array(cars.length).fill(false)
  );
  const [carNameCheckboxValues, setCarNameCheckboxValues] = useState<
    boolean[][]
  >(cars.map(() => []));

  const handleCarFilter = (carBrand: string) => {
    if (selectedCarBrands.includes(carBrand)) {
      setSelectedCarBrands(
        selectedCarBrands.filter(
          (selectedCarBrand) => selectedCarBrand !== carBrand
        )
      );
    } else {
      setSelectedCarBrands([...selectedCarBrands, carBrand]);
    }
  };

  const handleBrandCheckbox = (index: number) => {
    setBrandCheckboxValue((prev) => {
      const updatedCheckboxes = [...prev];
      updatedCheckboxes[index] = !updatedCheckboxes[index];

      // Toggle all car name checkboxes associated with the brand
      cars[index].items.forEach((_, itemIndex) => {
        const brandCheckboxState = updatedCheckboxes[index];
        const updatedCarNameCheckboxValues = [...carNameCheckboxValues];
        updatedCarNameCheckboxValues[index][itemIndex] = brandCheckboxState;
        setCarNameCheckboxValues(updatedCarNameCheckboxValues);
      });

      // If the checkbox is checked, add the brand to selectedCarBrands; otherwise, remove it
      if (updatedCheckboxes[index]) {
        setSelectedCarBrands((prevBrands) => [...prevBrands, cars[index].name]);
      } else {
        setSelectedCarBrands(
          selectedCarBrands.filter((brand) => brand !== cars[index].name)
        );
      }

      return updatedCheckboxes;
    });
  };

  //   const handleCarNamesCheckbox = (brandIndex: number, carIndex: number) => {
  //   to be implemented
  //   };

  return (
    <div>
      {cars.map((carBrand, brandIdx) => (
        <div key={brandIdx}>
          <div className="car-brand">
            <input
              type="checkbox"
              checked={brandCheckboxValue[brandIdx]}
              onChange={() => handleBrandCheckbox(brandIdx)}
            />
            <div onClick={() => handleCarFilter(carBrand.name)}>
              <span>{carBrand.name}</span>
              <span>
                {selectedCarBrands.includes(carBrand.name) ? "⬆" : "⬇"}
              </span>
            </div>
          </div>
          {selectedCarBrands.includes(carBrand.name) && (
            <div className="car-name-container">
              {carBrand.items.map((carName, carIdx) => (
                <div key={carIdx} className="car-name">
                  <span>{carName}</span>
                  <input
                    type="checkbox"
                    checked={carNameCheckboxValues[brandIdx][carIdx]}
                    // onChange={() => handleCarNamesCheckbox(brandIdx, carIdx)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MultiFilters;
