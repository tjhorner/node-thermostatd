interface State {
  powered_on: boolean
  current_mode: "HEAT" | "COOL" | "DRY" | "FAN"
  fan_speed: "AUTO" | "QUIET" | "LOW" | "MEDIUM" | "HIGH"
  target_temperature: number
  current_temperature: number
}

export class ThermostatdClient {
  constructor(host: string, token: string)

  getState(): Promise<State>
  patchState(newState: State): Promise<State>
}