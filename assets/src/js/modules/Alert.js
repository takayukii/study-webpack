var Alert = function(text) {
    this.text = text;
};
Alert.prototype.say = function(){
    console.log(this.text);
    alert('alert: ' + this.text);
};
module.exports = Alert;

