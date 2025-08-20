import { usePueblosContext } from "@/app/context/PueblosContext";
import { MultiSelect } from "@mantine/core";

const FilterByStateSearch = () => {
  const { stateArray, setstateArray, isLoading } = usePueblosContext();

  if (isLoading) return;
  const handleOnChange = (value: string[]) => {
    setstateArray(value);
    return;
  };
  return (
    <MultiSelect
      style={{ paddingRight: "1rem" }}
      checkIconPosition="left"
      label="Filter by State"
      placeholder="Filter by State"
      onChange={(value) => handleOnChange(value)}
      value={stateArray}
      data={[
        "Aguascalientes",
        "Baja California",
        "Baja California Sur",
        "Campeche",
        "Chiapas",
        "Chihuahua",
        "Coahuila",
        "Colima",
        "Durango",
        "Estado de México",
        "Guanajuato",
        "Guerrero",
        "Hidalgo",
        "Jalisco",
        "Michoacán",
        "Morelos",
        "Nayarit",
        "Nuevo León",
        "Oaxaca",
        "Puebla",
        "Querétaro",
        "Quintana Roo",
        "San Luis Potosí",
        "Sinaloa",
        "Sonora",
        "Tabasco",
        "Tamaulipas",
        "Tlaxcala",
        "Veracruz",
        "Yucatán",
        "Zacatecas",
      ]}
      hidePickedOptions
      comboboxProps={{
        transitionProps: { transition: "pop", duration: 200 },
        zIndex: "1002",
      }}
    />
  );
};

export default FilterByStateSearch;
