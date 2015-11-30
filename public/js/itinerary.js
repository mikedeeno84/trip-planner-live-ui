function addEntry() {
  function setActivityArray(type){
    if(type === "hotel")
      return [all_hotels, {icon: '/images/lodging_0star.png'}];
    else if (type === "restaurant")
      return [all_restaurants, {icon: '/images/restaurant.png'}];
    else if (type === "activity")
      return [all_activities, {icon: '/images/star-3.png'}];

  }

  $(".add-entry").on("click", function() {
    var activityType = $(this).parent();
    var eventTitle = activityType.find("select option:selected").text();

    // Identify hotel, restaurant, or activity
    var activityTypeName = activityType[0].id.split("-")[0];


    var activityArray = setActivityArray(activityTypeName)[0];
    var optionsObject = setActivityArray(activityTypeName)[1];

    var currentItem = activityArray.filter(function (entry) {
      return entry.name === eventTitle;
    })[0];
    currentItem.marker = drawLocation(currentItem.place[0].location, optionsObject);
    console.log(currentItem.marker);

    var entryToAppend = '<li><div class="itinerary-item"><span class="title">' + eventTitle + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div></li>';
 
    // Select correct list name

    var activityList = $("#"+activityTypeName+"-list");
 

    if(eventTitle){ 
      activityList.append(entryToAppend);
      activityList.find("button").on("click", function (){
        $(this).parent().parent().remove();
        currentItem.marker.setMap(null);
      })
    };    
  });
}




$(document).ready(function() {
  addEntry();
});

  // drawLocation(hotelLocation, {
  //   icon: '/images/lodging_0star.png'
  // });
  // restaurantLocations.forEach(function(loc) {
  //   drawLocation(loc, {
  //     icon: '/images/restaurant.png'
  //   });
  // });
  // activityLocations.forEach(function(loc) {
  //   drawLocation(loc, {
  //     icon: '/images/star-3.png'
  //   });
  // });