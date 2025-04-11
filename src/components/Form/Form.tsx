import { ChangeEvent, FormEvent, useState } from "react";
import { countries } from "../../data/countries";
import styles from './Form.module.css'
import type { SearchType } from "../../types";
import Alert from "../Alert/Alert";

type FormProps = {
    fetchWeather: () => void 
}

export default function Form({fetchWeather} : FormProps) {
    const [search, setSearch] = useState<SearchType>({
        city: '',
        country: ''
    })

    const [alert, setAlert] = useState('')

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
         setSearch({
            ...search,
            [e.target.name] : e.target.value
         })
    }

    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(Object.values(search).includes('')) {
            setAlert('Ningún campo puede estar vacío')
            return
        }
    }
  return (
    
    <form className={styles.form} onSubmit={handleSubmit}>
        {alert && <Alert>{alert}</Alert>}
      <div className={styles.field}>
        <label htmlFor="city">Ciudad: </label>
        <input type="text" id="city" name="city" placeholder="Ciudad" value={search.city} onChange={handleChange}/>
      </div>
      <div className={styles.field}>
        <label htmlFor="country">País: </label>
        <select name="country" id="country" value={search.country} onChange={handleChange}>
          <option>--Seleccione un país--</option>
          {countries.map((country) => (
            <option value={country.code} key={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <input className={styles.submit} type="submit" value="Consultar clima" />
    </form>
  );
}
