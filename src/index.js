import Point from './point'
import Cloud from './cloud'
import {resample, scale, translateTo, greedyCloudMatch} from './utils'

export default class Wanda {
  constructor() {
    this.templates = []
  }

  train(id, points) {
    console.log('training')
    this.templates.push(new Cloud(id, points))
  }

  recognize(points) {
    console.log('recognize')
    points = resample(points, NumPoints)
    points = scale(points)
    points = translateTo(points, Origin)

    let b = +Infinity
    let u = -1

    for (let i=0; i<this.templates.length; ++i) {
      let d = greedyCloudMatch(points, this.templates[i])

      if (d < b) {
        b = d // least distance
        u = i // cloud index
      }
    }

    if (u === -1) {
      return null
    } else {
      return {
        id: this.templates[u].id,
        score: Math.max((b - 2.0) / -2.0, 0.0)
      }
    }
  }
}
