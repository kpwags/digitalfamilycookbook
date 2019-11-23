import styled from 'styled-components';

const RecipeView = styled.div`
  width: 1000px;
  margin: 0 auto;

  h1,
  h2 {
    color: ${props => props.theme.green};
  }

  .recipe-image {
    width: 1000px;
    margin: 10px auto 25px;
    text-align: center;

    img {
      max-width: 1000px;
    }
  }

  p.details {
    font-size: 1.1rem;
    line-height: 1;
    margin-bottom: 10px;
  }

  .main {
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-template-rows: 1fr;
    grid-column-gap: 10px;
    grid-row-gap: 0px;

    @media print {
      display: block;
    }

    .recipe-details {
      grid-column-start: 1;
      grid-column-end: 1;

      ul.ingredients {
        margin: 0 0 0 30px;
        padding: 0;

        li {
          font-size: 1rem;
          margin: 0.35em 0;
        }
      }

      ol.directions {
        margin: 0 0 0 30px;
        padding: 0;

        li {
          font-size: 1rem;
          line-height: 1.75;
          margin: 0.25rem 0;
        }
      }
    }

    .nutrition {
      grid-column-start: 2;
      grid-column-end: 2;

      @media print {
        display: none;
      }

      .info {
        border: 1px solid ${props => props.theme.black};
        .content {
          padding: 8px;

          h3 {
            margin: 0;
            padding: 0;
            font-weight: bold;
            border-bottom: 8px solid ${props => props.theme.black};
          }

          .nutrition-data {
            display: grid;
            grid-template-columns: 3fr 1fr;
            grid-template-rows: 1fr;
            grid-column-gap: 10px;
            grid-row-gap: 10px;
            font-size: 1rem;
            border-bottom: 1px solid ${props => props.theme.black};
            padding: 0.25rem 0;

            .item {
              grid-column-start: 1;
              grid-column-end: 1;
              font-weight: bold;
            }

            .value {
              grid-column-start: 2;
              grid-column-end: 2;
              text-align: right;
            }
          }

          .nutrition-data-calories {
            display: grid;
            grid-template-columns: 3fr 1fr;
            grid-template-rows: 1fr;
            grid-column-gap: 10px;
            grid-row-gap: 10px;
            border-bottom: 5px solid ${props => props.theme.black};
            font-size: 1.2rem;
            font-weight: bold;
            padding: 0.25rem 0;

            .item {
              grid-column-start: 1;
              grid-column-end: 1;
            }

            .value {
              grid-column-start: 2;
              grid-column-end: 2;
              text-align: right;
            }
          }

          .nutrition-data:last-child {
            border-bottom: none;
          }
        }
      }
    }
  }

  @media print {
    .hide-print {
      display: none;
    }
  }

  @media all and (max-width: 768px) {
    width: 100%;

    .recipe-image {
      width: 100%;
      margin: 10px auto 25px;
      text-align: center;

      img {
        max-width: 100%;
      }
    }
  }

  @media all and (max-width: 767px) {
    width: 100%;

    .recipe-image {
      display: none;
    }

    .main,
    .nutrition-data,
    .nutrition-data-calories {
      display: block;
    }

    .nutrition {
      margin: 30px 0 0 0;
      padding: 30px 0 0 0;
      border-top: 1px solid ${props => props.theme.black};
    }
  }
`;

export { RecipeView };
