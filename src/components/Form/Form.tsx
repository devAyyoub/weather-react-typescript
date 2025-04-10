import { countries } from "../../data/countries";

export default function Form() {
  return (
    <form>
      <div>
        <label htmlFor="city">Ciudad: </label>
        <input type="text" id="city" name="city" placeholder="Ciudad" />
      </div>
      <div>
        <label htmlFor="country">País: </label>
        <select name="" id="">
          <option>--Seleccione un país--</option>
          {countries.map((country) => (
            <option value={country.code} key={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <input type="submit" value="Consultar clima" />
    </form>
  );
}
