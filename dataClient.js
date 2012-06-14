/**************************************************************************
 * Copyright (c) 2012 Adtec Productions, Inc.
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the Lesser GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the 
 * Lesser GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License 
 * along with this program.  If not, see http://www.gnu.org/licenses/
 *************************************************************************/

var 
TOKEN_FILE_LOC = __dirname + '/metadata/token.json',
USER_FILE_LOC = __dirname + '/metadata/me.json',

getToken = function(){
   var fs = require('fs'),
   path = require('path'),
   buffer = null, 
   jsonBuffer = null;
   if(!path.existsSync(TOKEN_FILE_LOC)){
      return null;
   }
   buffer = fs.readFileSync(TOKEN_FILE_LOC);
   jsonBuffer = JSON.parse(buffer);
   return (jsonBuffer && jsonBuffer.token)? jsonBuffer.token : null;
},

getUser = function()
   {
   var fs = require('fs'),
   path = require('path'),
   buffer = null, 
   jsonBuffer = null;
   if(!path.existsSync(USER_FILE_LOC)){
      console.log("Error: The user file @ " + USER_FILE_LOC + " does not exist. Run apiReader.getUserData() to generate the user file.");
      return null;
   }
   buffer = fs.readFileSync(USER_FILE_LOC);
   jsonBuffer = JSON.parse(buffer);
   return jsonBuffer? jsonBuffer : null;
   },

getApps = function()
   {
   var user = getUser();
   if (!user){
      console.log("Error: Could not retrieve user data.");
      return null;
      }
   return user.apps;
   },
   
getAppIdList = function()
   {
   var result = [];
   var apps = getApps();
   if((!apps)||(!apps.all)){
      console.log("Error: Could not retrieve apps data.");
      return result;
      }
   for(var i=0; i<apps.all.length; i++){
      result.push(apps.all[i].id);
      }
   
   return result;
   
   }
;

module.exports = {
   getToken: getToken,
   getUser: getUser,
   getApps: getApps,
   getAppIdList: getAppIdList
};