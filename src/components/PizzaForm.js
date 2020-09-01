import React from "react"

const PizzaForm = (props) => {

  const checkedBoolean = () => {
    return props.formData.vegetarian === "true" || props.formData.vegetarian === true
  }
  return (
    <div className="form-row">
      <div className="col-5">
        <input type="text" className="form-control" name="topping" value={props.formData.topping} onChange={props.onChangeHandler} />
      </div>
      <div className="col">
        <select className="form-control" name="size" value={props.formData.size} onChange={props.onChangeHandler} >
          <option value="Small" >Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
      </div>
      <div className="col">
        <div className="form-check">
          <input className="form-check-input" type="radio" name="vegetarian" value={checkedBoolean()} checked={checkedBoolean()} onChange={props.onChangeHandler} />
          <label className="form-check-label">
            Vegetarian
            </label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="vegetarian" value={!checkedBoolean()} checked={!checkedBoolean()} onChange={props.onChangeHandler} />
          <label className="form-check-label">
            Not Vegetarian
            </label>
        </div>
      </div>
      <div className="col">
        <button type="submit" className="btn btn-success" onClick={props.onSubmitClick}>Submit</button>
      </div>
    </div>

  )
}

export default PizzaForm
