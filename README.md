# CSV Runner Dashboard

## 1. Project Overview

This project is a frontend-only web dashboard built to visualize runner data from CSV uploads. It allows users to upload a CSV file containing running logs, validates the data, computes key metrics (average, minimum, maximum miles), and displays interactive charts for both overall performance and individual runner progress.

The goal is to provide a clean, user-friendly interface for analyzing running data without the need for a backend server.

## 2. Assumptions

*   **CSV Format**: The CSV file must have headers `date`, `person`, and `miles run`.
*   **Date Format**: Dates are expected to be in a format parseable by the JavaScript `Date` constructor (e.g., YYYY-MM-DD).
*   **Client-Side Processing**: All data processing happens in the browser. Large files might impact performance, but for typical usage, this is sufficient.
*   **Data Persistence**: Data is not persisted. Refreshing the page will clear the data.
*   **Unique Entries**: Multiple entries for the same person on the same date are treated as separate runs and aggregated in the overall chart by date.

## 3. Prerequisites

*   **Node.js**: v18.17.0 or higher
*   **Package Manager**: npm (v9 or higher)

## 4. Setup

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Environment Variables**:
    No environment variables are required for this project. However, an example file is provided for consistency.
    ```bash
    cp .env.example .env
    ```
    *(Note: `.env.example` is empty as no secrets are needed)*

3.  **Sample Data**:
    A sample CSV file `sample_data.csv` is included in the root directory for testing.

## 5. Run and Verify

1.  **Start the Development Server**:
    ```bash
    npm run dev
    ```

2.  **Open the App**:
    Navigate to `http://localhost:3000` in your browser.

3.  **Verify Functionality**:
    *   **Upload Valid CSV**: Use `sample_data.csv`.
        *   Verify that "Overall Metrics" cards appear.
        *   Verify the "Total Miles Run per Date" chart is rendered.
    *   **Check Per Person View**:
        *   Select a person (e.g., "Alice") from the dropdown.
        *   Verify that specific metrics for Alice appear.
        *   Verify the "Miles Run Over Time: Alice" chart appears.
    *   **Upload Invalid CSV**:
        *   Create a CSV with missing headers or invalid data (e.g., negative miles).
        *   Upload it and observe the error alert with specific validation messages.

## 6. Features and Limitations

**Features**:
*   **CSV Parsing**: Robust parsing using PapaParse.
*   **Validation**: Strict validation for headers and data types.
*   **Metrics**: Automatic calculation of Average, Min, and Max miles.
*   **Visualizations**: Interactive charts using Recharts.
*   **Responsive UI**: Built with Tailwind CSS and shadcn/ui for a modern look.

**Limitations**:
*   **No Persistence**: Data is lost on refresh.
*   **Single File**: Only one file can be analyzed at a time.

**Future Improvements**:
*   Add support for comparing multiple runners on the same chart.
*   Implement local storage to persist data across sessions.
*   Add more advanced metrics (e.g., weekly mileage).

## 7. Notes on Architecture

*   **Folder Structure**:
    *   `app/`: Next.js App Router pages.
    *   `components/`: React components (UI and feature-specific).
    *   `lib/`: Utility functions for parsing, validation, and metrics logic.
    *   `types/`: TypeScript definitions.
*   **State Management**: React `useState` is used in the `Dashboard` component as the single source of truth. `useMemo` is used to derive metrics and chart data efficiently.
*   **Separation of Concerns**: Logic for parsing and validation is separated from UI components to ensure testability and maintainability.

## 8. Accessibility and UI

*   **Accessibility**:
    *   All form inputs have associated labels.
    *   Colors are chosen to meet contrast guidelines (using shadcn/ui defaults).
    *   Charts include tooltips for better data readability.
*   **UI/UX**:
    *   **Spacing**: Consistent spacing using Tailwind's spacing scale.
    *   **Typography**: Clear and readable fonts using `Inter` (default Next.js font).
    *   **Feedback**: Clear loading states and error messages guide the user.
