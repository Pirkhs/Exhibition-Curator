
# Exhibition Curator

A link to the live version on Netflify can be found here: https://exhibition-curator-nathan-briers.netlify.app

## Project Summary
This project enables users to become their very own curator of various antiques and fine artworks by browsing through collections and choosing to add specific pieces to their very own exhbition. <br>
It must be noted this application is solely front-end, so any exhibition data will be lost upon a new session.

## User Stories
- Be welcomed on the web appplication's **"Home"** page
- Browse through the **Metropolitan Museum of Art** (MMoA) and **Harvard Art Museum** (HAM) collections
- Search through either collection by inputting key words/phrases in the searchbar
- Collections can be filtered by their department/classification respectively
- The Harvard Art Museum may also be sorted by :
    - Accession Year
    - Rank
    - Total Page Views
    - Date of First Page View
- Collections can also be paged through at the bottom of that respective collection's section.
- Choose the quantity of results to show for each collection per page
- Click on the **'View More'** button under each image to see more info about that object's :
    - Title
    - Collection Id
    - Accession Year
    - Department
    - Credit Line
    - Culture
- Add a particular object to your exhibition via the button labelled **'Add to My Collection'**
- View your very own collection on the **'Exhibition'** Page
- If you wish to remove an object from your collection, click the **'Remove'** button, in which a modal window will pop up to confirm.

## Setting Up Locally
If you wish to clone this repo locally run the command ```git clone https://github.com/Pirkhs/Exhibition-Curator.git``` in your terminal <br> 
Ensure you are in the correct 'Exhibition Curator' working directory: ```cd [local_file_path]``` <br> 
Run ```npm install``` in your terminal to download all the required npm packages <br> 
You will need to request an api key to be able to fetch data from the Harvard Arts Museum:
- Visit 'https://harvardartmuseums.org/collections/api'
- Click on "*Send a request*"
- Fill out the survey 
- You should receive your api key via the email you submitted <br>

Create a new file called **.env** inside the root folder and contains the following: ```VITE_API_KEY=[your_api_key]``` <br>
The command ```npm run dev``` will then host the server locally on port number 5173 <br> 

## Version Control
Node v21.2.0+ <br>
Git v2.45.2+ <br>
React v18.3.1+

## Additional Information
- Mobile viewing now supported
- Feel free to leave suggestions and/or feedback
- Have fun curating !