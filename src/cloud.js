import Point from './point'
import {resample, scale, translateTo} from './utils'
import Constants from './constants'

export default class Cloud {
  constructor(id, points) {
    this.id = id
    this.points = resample(points, Constants.NUM_POINTS)
    this.points = scale(this.points)
    this.points = translateTo(this.points, Constants.ORIGIN)
  }
}
