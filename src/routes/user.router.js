var router = require('express').Router();

router.get('/', (req,res) => {
    res.json({'test': "test"});
});

module.exports = router;