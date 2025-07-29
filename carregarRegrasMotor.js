let regrasMotor = {};

fetch("motor_validator_base.json")
  .then((res) => res.json())
  .then((data) => {
    regrasMotor = data;
  });