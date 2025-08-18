import { usePueblosContext } from "@/app/context/PueblosContext";
import { MultiSelect } from "@mantine/core";

const FilterByStateSearch = () => {
  const { setstateArray, isLoading } = usePueblosContext();

  if (isLoading) return;
  const handleOnChange = (value: string[]) => {
    console.log("jaimes value", value);
    setstateArray(value);
    return;
  };
  return (
    <MultiSelect
      label="Filter by State"
      placeholder="Filter by State"
      onChange={(value) => handleOnChange(value)}
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
      comboboxProps={{ transitionProps: { transition: "pop", duration: 200 } }}
    />
  );
};

export default FilterByStateSearch;
