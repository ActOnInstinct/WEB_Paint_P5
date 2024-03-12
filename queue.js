function Queue() {
   this.elements = [];
    
   this.enqueue = function(node) {
       this.elements.push(node);
    }
  
   this.dequeue = function() {
       if(this.elements.length > 0) { 
           return this.elements.shift();
       } else {
           return 'Error: Underflow!';
       }
    }
    
   this.empty = function() {
       return this.elements.length == 0;
    }
    
   this.head = function() {
       if(this.elements.length > 0) {
           return this.elements[0];
       } else {
           return "Empty queue!";
       }
    }
 }