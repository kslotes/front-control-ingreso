import {ButtonGroup, ToggleButton, InputGroup, FormControl} from 'react-bootstrap'
import {useState} from 'react'
const DIAS_SEMANA = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"]
const BotonesDias = () => {
  const [checked, setChecked] = useState({
	selected: {
	  0: false,
	  1: false,
	  2: false,
	  3: false,
	  4: false,
	  5: false,
	  6: false
	}});

  const renderChecked = () => {

  }
  const handleButtonChange = (event) => {
	const key = event.target.value;
	const value = !checked.selected[key]
	console.log(value, key)
	const newSelected = Object.assign(checked.selected, {[key]: value});
	setChecked({selected: newSelected})
	console.log(checked.selected)
	renderChecked(checked.selected)
  }
  return (
	<div>
	  <ButtonGroup toggle>
		{DIAS_SEMANA.map((dia, i) => {
		  return (
			<ToggleButton type="checkbox" variant="outline-success" checked={checked.selected[i]} value={i} key={dia} onChange={handleButtonChange}>{dia}</ToggleButton>
		  )
		})}
	  </ButtonGroup>
	  {DIAS_SEMANA.map((dia, i) => {
		return (
		  <div hidden={!checked.selected[i]}>
			<InputGroup className="mt-3">
			  <InputGroup.Prepend>
				<InputGroup.Text>{dia}</InputGroup.Text>
				<InputGroup.Text>Hora Inicio</InputGroup.Text>
			  </InputGroup.Prepend>
			  <FormControl type="time"/>
			  <InputGroup.Append>
				<InputGroup.Text>Hora Fin</InputGroup.Text>
			  </InputGroup.Append>
			  <FormControl type="time" />
			</InputGroup>
		  </div>
		)
	  })}
	</div>
  )
}

export default BotonesDias;
