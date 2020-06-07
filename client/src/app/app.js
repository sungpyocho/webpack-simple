import { inputsAreValid } from "./utils/inputs-are-valid";
import { parseInputs } from "./utils/parse-input";
import axios from "axios";

export const run = (alertService, componentService) => {
  alertService.hideErrors();

  axios
    .get("/api/hello")
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

  componentService.onClick(() => {
    alertService.hideErrors();
    const inputs = componentService.getInputs();
    const parsedInputs = parseInputs(...inputs);
    if (inputsAreValid(...parsedInputs)) {
      const [numA, numB] = parsedInputs;
      componentService.setResult(numA + numB);
    } else {
      componentService.setResult("");
      alertService.handleAdditionError(inputs, parsedInputs);
    }
  });
};
