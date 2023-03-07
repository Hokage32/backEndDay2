const houses = require('./db.json')
let houseId = 4

module.exports = {
    getHouses: (req, res) => {
        res.status(200).send(houses)

    },


    deleteHouse: (req, res) => {
        let existingId = req.params.id

        for (let i = 0; i < houses.length; i++) {
           if(houses[i].id === +existingId){
            houses.splice(i,1)
            res.status(200).send(houses)
            
           }
            
        }
        res.status(400).send('user not found')
    },

    createHouse: (req, res) => {
      const{address, price, imageURL}   = req.body
      if(!address || !price || !imageURL){
        res.status(400).send('missing info')
      }
      
      const copy = {...req.body, id:houseId}
      houses.push(copy)
      houseId++
      res.status(200).send(houses)

    },

    updateHouse: (req, res) => {
        const{id} = req.params
        const{type} = req.body
        const idx = houses.findIndex(house => house.id === +id)
        if(type === 'plus'){
            houses[idx].price += 10000
            res.status(200).send(houses)
        }else{
            if(type === 'minus'){
                if(houses[idx].price > 0){
                    houses[idx].price -= 10000
                    res.status(200).send(houses)
                }
            }
        }
    }
    
    
}