## Slat Progress Rows With Even Alignment

Use this pattern to showcase multi-item progress tracking with strict, pixel-perfect vertical alignment across rows.

### Anatomy & Layout Structure

1. **`SlatGroup` container**: Set `usage: "card"` (or place directly inside `CardBody`).
2. **`Slat` column configuration**:
   - Set `col: "minmax(0, 1fr) 7.5rem"` (or an explicit fixed width for the end column).
   - Set `variant: "row"`.
   - Set `size: "small"` (or `"medium"`).
   - The fixed end track (e.g. `7.5rem`) guarantees all trailing `Status` badges align vertically regardless of label length.
3. **`slot="accessory"`**:
   - Leading icon or avatar (e.g. `_Icon` with `icon="mui-icon-text-below-folder"`, `size="medium"`).
4. **`slot="start"` (Progress Track)**:
   - Wrap in an `HStack` with `space: "var(--space-300)"`, `width: "100%"`, and `alignY: "center"`.
   - **Label `Body`**: Apply `style: "min-width: 6rem;"` (or consistent `min-width`) and `weight: "medium"`. **Crucial:** The fixed `min-width` on the label forces all `Progress` bars to begin at the exact same horizontal alignment across rows.
   - **`Progress` bar**: Set `style: "width: 100%;"` with numeric `progress` (0–100). The progress bar fills the flexible middle space.
   - **Percentage `Body`**: Set `size: "x-small"`, `weight: "medium"`, e.g. text `"70%"`.
5. **`slot="end"` (Status / Action Track)**:
   - Wrap in an `HStack` with `alignX: "end"`, `alignY: "center"`.
   - Contains a `Status` badge (e.g. `variant: "info"` for "In progress", `variant: "positive"` for "On track").

### Reference Fragment

```json
{
  "id": "project_progress_group",
  "type": "SlatGroup",
  "props": {
    "usage": "card"
  },
  "children": [
    {
      "id": "progress_row_alpha",
      "type": "Slat",
      "props": {
        "col": "minmax(0, 1fr) 7.5rem",
        "size": "small",
        "variant": "row"
      },
      "children": [
        {
          "id": "progress_row_alpha_icon",
          "type": "_Icon",
          "props": {
            "icon": "mui-icon-text-below-folder",
            "size": "medium",
            "slot": "accessory"
          },
          "children": []
        },
        {
          "id": "progress_row_alpha_content",
          "type": "HStack",
          "props": {
            "slot": "start",
            "space": "var(--space-300)",
            "width": "100%",
            "alignY": "center",
            "height": "auto"
          },
          "children": [
            {
              "id": "progress_row_alpha_label",
              "type": "Body",
              "props": {
                "size": "small",
                "text": "Alpha",
                "style": "min-width: 6rem;",
                "weight": "medium"
              },
              "children": []
            },
            {
              "id": "progress_row_alpha_bar",
              "type": "Progress",
              "props": {
                "style": "width: 100%;",
                "progress": 70
              },
              "children": []
            },
            {
              "id": "progress_row_alpha_percent",
              "type": "Body",
              "props": {
                "size": "x-small",
                "text": "70%",
                "weight": "medium"
              },
              "children": []
            }
          ]
        },
        {
          "id": "progress_row_alpha_status_wrapper",
          "type": "HStack",
          "props": {
            "slot": "end",
            "alignX": "end",
            "alignY": "center",
            "width": "auto",
            "height": "auto"
          },
          "children": [
            {
              "id": "progress_row_alpha_status",
              "type": "Status",
              "props": {
                "text": "In progress",
                "variant": "info",
                "size": "small"
              },
              "children": []
            }
          ]
        }
      ]
    },
    {
      "id": "progress_row_beta",
      "type": "Slat",
      "props": {
        "col": "minmax(0, 1fr) 7.5rem",
        "size": "small",
        "variant": "row"
      },
      "children": [
        {
          "id": "progress_row_beta_icon",
          "type": "_Icon",
          "props": {
            "icon": "mui-icon-text-below-folder",
            "size": "medium",
            "slot": "accessory"
          },
          "children": []
        },
        {
          "id": "progress_row_beta_content",
          "type": "HStack",
          "props": {
            "slot": "start",
            "space": "var(--space-300)",
            "width": "100%",
            "alignY": "center",
            "height": "auto"
          },
          "children": [
            {
              "id": "progress_row_beta_label",
              "type": "Body",
              "props": {
                "size": "small",
                "text": "Beta",
                "style": "min-width: 6rem;",
                "weight": "medium"
              },
              "children": []
            },
            {
              "id": "progress_row_beta_bar",
              "type": "Progress",
              "props": {
                "style": "width: 100%;",
                "progress": 45
              },
              "children": []
            },
            {
              "id": "progress_row_beta_percent",
              "type": "Body",
              "props": {
                "size": "x-small",
                "text": "45%",
                "weight": "medium"
              },
              "children": []
            }
          ]
        },
        {
          "id": "progress_row_beta_status_wrapper",
          "type": "HStack",
          "props": {
            "slot": "end",
            "alignX": "end",
            "alignY": "center",
            "width": "auto",
            "height": "auto"
          },
          "children": [
            {
              "id": "progress_row_beta_status",
              "type": "Status",
              "props": {
                "text": "In progress",
                "variant": "info",
                "size": "small"
              },
              "children": []
            }
          ]
        }
      ]
    },
    {
      "id": "progress_row_gamma",
      "type": "Slat",
      "props": {
        "col": "minmax(0, 1fr) 7.5rem",
        "size": "small",
        "variant": "row"
      },
      "children": [
        {
          "id": "progress_row_gamma_icon",
          "type": "_Icon",
          "props": {
            "icon": "mui-icon-text-below-folder",
            "size": "medium",
            "slot": "accessory"
          },
          "children": []
        },
        {
          "id": "progress_row_gamma_content",
          "type": "HStack",
          "props": {
            "slot": "start",
            "space": "var(--space-300)",
            "width": "100%",
            "alignY": "center",
            "height": "auto"
          },
          "children": [
            {
              "id": "progress_row_gamma_label",
              "type": "Body",
              "props": {
                "size": "small",
                "text": "Gamma",
                "style": "min-width: 6rem;",
                "weight": "medium"
              },
              "children": []
            },
            {
              "id": "progress_row_gamma_bar",
              "type": "Progress",
              "props": {
                "style": "width: 100%;",
                "progress": 90
              },
              "children": []
            },
            {
              "id": "progress_row_gamma_percent",
              "type": "Body",
              "props": {
                "size": "x-small",
                "text": "90%",
                "weight": "medium"
              },
              "children": []
            }
          ]
        },
        {
          "id": "progress_row_gamma_status_wrapper",
          "type": "HStack",
          "props": {
            "slot": "end",
            "alignX": "end",
            "alignY": "center",
            "width": "auto",
            "height": "auto"
          },
          "children": [
            {
              "id": "progress_row_gamma_status",
              "type": "Status",
              "props": {
                "text": "On track",
                "variant": "positive",
                "size": "small"
              },
              "children": []
            }
          ]
        }
      ]
    }
  ]
}
```
