const moment = require('moment')
const { User, Appointment } = require('../models')
const { Op } = require('sequelize')
const sequelize = require('sequelize')

class ScheduleController {
  async index (req, res) {
    const appointments = await Appointment.findAll({
      include: [
        {
          model: User,
          on: {
            id: {
              [Op.eq]: sequelize.col('Appointment.user_id')
            }
          }
        }
      ],
      where: {
        provider_id: req.session.user.id,
        date: {
          [Op.between]: [
            moment()
              .startOf('day')
              .format(),
            moment()
              .endOf('day')
              .format()
          ]
        }
      }
    })

    return res.render('schedule/index', { appointments })
  }
}

module.exports = new ScheduleController()
