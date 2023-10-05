# Tagberegneren

## Table of Contents

- [Project Description](#project-description)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Project Description

**Tagberegneren** is a smart solution designed to help users calculate the price of a new roof. It seamlessly connects to a national API that provides essential building data, allowing users to obtain accurate cost estimates for roofing projects. This tool aims to simplify the process of pricing roofing projects, making it more accessible and efficient for both roofing professionals and homeowners.

**Motivation:**
The primary motivation behind **Tagberegneren** is to generate leads for roofing companies while providing a valuable service to users. By offering a user-friendly platform to calculate roofing costs, the project aims to attract potential customers and generate income for roofing businesses. This win-win approach benefits both users seeking cost estimates and roofing companies seeking new clients.

## Features

**Tagberegneren** offers the following key features:

- **Custom Roof Area Calculation:** Utilizing a custom algorithm, the tool accurately calculates the roof area, ensuring precise cost estimates for roofing projects.

- **BBR API Integration:** Seamlessly connects to the Building and Dwelling Register (BBR) API, allowing users to collect essential building data, which is crucial for determining roofing costs.

- **Access to Roofing Offers:** Provides users with easy access to roofing offers, making it convenient for them to explore options and make informed decisions regarding their new roof.

## Installation

To set up **Tagberegneren** on your local machine, follow these simple steps:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/tagberegneren.git
    ```
2. **Install Dependencies:**

   ```bash
   npm install
   ```
   3. **Start developing!**
   Start the site in development mode. Your site will be available at `http://localhost:3000`.
   
   ```bash
    npm run dev
    ```
## Usage
Using Tagberegneren is a straightforward process:

Enter Address: Start by entering the address of the building for which you want to calculate roofing costs. There should be a form or input field where users can input this information.

Follow-Up Questions: After entering the address, the tool will ask a series of follow-up questions to collect additional details about the building. These questions are essential for accurate cost calculations.

Calculate Roof Area: Tagberegneren employs a custom algorithm to calculate the roof area based on the provided information and the data collected from the Building and Dwelling Register (BBR) API.

View Roofing Offers: Once the roof area is calculated, users will have access to roofing offers tailored to their specific project. This feature makes it easy for users to explore and compare offers from roofing companies.

