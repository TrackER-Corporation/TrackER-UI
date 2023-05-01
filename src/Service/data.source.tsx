export const Banner50DataSource = {
  wrapper: { className: 'home-page-wrapper banner5' },
  page: { className: 'home-page banner5-page' },
  childWrapper: {
    className: 'banner5-title-wrapper',
    children: [
      { name: 'title', children: 'TrackER System', className: 'banner5-title' },
      {
        name: 'explain',
        className: 'banner5-explain',
        children: 'Innovative Platform for a New Energy Ecosystem',
      },
      {
        name: 'content',
        className: 'banner5-content',
        children: 'See the power of the TrackER System at work in your industry',
      },
      {
        name: 'button',
        className: 'banner5-button-wrapper',
        children: {
          href: '/Access',
          className: 'banner5-button',
          type: 'primary',
          children: 'Join Now!',
        },
      },
    ],
  },
  image: {
    className: 'banner5-image',
    children:
      'https://res.cloudinary.com/dgfnyulqh/image/upload/v1661783604/7941763_3395012__1_-removebg-preview_q7tjt0.png',
  },
};
export const Feature60DataSource = {
  wrapper: { className: 'home-page-wrapper feature6-wrapper' },
  OverPack: { className: 'home-page feature6', playScale: 0.3 },
  Carousel: {
    className: 'feature6-content',
    dots: false,
    wrapper: { className: 'feature6-content-wrapper' },
    titleWrapper: {
      className: 'feature6-title-wrapper',
      barWrapper: {
        className: 'feature6-title-bar-wrapper',
        children: { className: 'feature6-title-bar' },
      },
      title: { className: 'feature6-title' },
    },
    children: [
      {
        title: { className: 'feature6-title-text', children: 'TrackER Customers' },
        className: 'feature6-item',
        name: 'block0',
        key: 'block0',
        children: [
          {
            md: 8,
            xs: 24,
            className: 'feature6-number-wrapper',
            name: 'child0',
            number: {
              className: 'feature6-number',
              toText: true,
              children: '100',
            },
            children: { className: 'feature6-text', children: 'Customers' },
          },
          {
            md: 8,
            xs: 24,
            className: 'feature6-number-wrapper',
            name: 'child1',
            number: {
              className: 'feature6-number',
              toText: true,
              children: '150000',
              unit: {
                className: 'feature6-unit',
                children: 'kW/Day',
              },
            },
            children: { className: 'feature6-text', children: 'Global Energy Reduction' },
          },
          {
            md: 8,
            xs: 24,
            className: 'feature6-number-wrapper',
            name: 'child2',
            number: {
              className: 'feature6-number',
              toText: true,
              children: '10',
              unit: {
                className: 'feature6-unit',
                children: '%',
              },
            },
            children: { className: 'feature6-text', children: 'Estimated Savings' },
          },
        ],
      },
      {
        title: { className: 'feature6-title-text', children: 'TrackER Vendors' },
        className: 'feature6-item',
        name: 'block0',
        key: 'block0',
        children: [
          {
            md: 8,
            xs: 24,
            className: 'feature6-number-wrapper',
            name: 'child0',
            number: {
              className: 'feature6-number',
              toText: true,
              children: '20',
            },
            children: { className: 'feature6-text', children: 'Energy Vendor' },
          },
          {
            md: 8,
            xs: 24,
            className: 'feature6-number-wrapper',
            name: 'child1',
            number: {
              className: 'feature6-number',
              toText: true,
              children: '300000',
              unit: {
                className: 'feature6-unit',
                children: 'kW',
              },
            },
            children: { className: 'feature6-text', children: 'Energy Production' },
          },
          {
            md: 8,
            xs: 24,
            className: 'feature6-number-wrapper',
            name: 'child2',
            number: {
              className: 'feature6-number',
              toText: true,
              children: '10',
              unit: {
                className: 'feature6-unit',
                children: '€/kWh',
              },
            },
            children: { className: 'feature6-text', children: 'Estimated Earnings' },
          },
        ],
      },

    ],
  },
};
export const Pricing00DataSource = {
  wrapper: { className: 'home-page-wrapper pricing0-wrapper' },
  OverPack: { playScale: 0.3, className: 'home-page pricing0' },
  imgWrapper: { className: 'pricing0-img-wrapper', md: 12, xs: 24 },
  img: {
    className: 'pricing0-img',
    name: 'image',
    children:
      'https://res.cloudinary.com/dgfnyulqh/image/upload/v1661781746/mockuper_2_tn7jru.png',
  },
  childWrapper: {
    className: 'pricing0-text-wrapper',
    md: 12,
    xs: 24,
    children: [
      {
        name: 'title',
        children: 'The power of the TrackER System ',
        className: 'pricing0-title',
      },
      {
        name: 'content',
        children: <p>Today, most companies still rely on monthly paper bills when it comes to energy management - an analog approach that cannot provide actionable insights. <br /> <br />The TrackER platform provides a set of sophisticated capabilities to collect, digitize, standardize and analyze smart meter data over different utility service territories. Having 15-minutes interval data at your finger tips is a game changer for a proactive energy management strategy.</p>,
        className: 'pricing0-content',
      },
      { name: 'pricing', children: '€ 7M Annual Energy Saving', className: 'pricing0-pricing' },
    ],
  },
};
export const Feature80DataSource = {
  wrapper: { className: 'home-page-wrapper feature8-wrapper' },
  page: { className: 'home-page feature8' },
  OverPack: { playScale: 0.3 },
  titleWrapper: {
    className: 'feature8-title-wrapper',
    children: [
      { name: 'title', className: 'feature8-title-h1', children: 'Customers Review' },
    ],
  },
  childWrapper: {
    className: 'feature8-button-wrapper',
    children: [
      {
        name: 'button',
        className: 'feature8-button',
        children: { href: '/Access', children: 'Join Now!' },
      },
    ],
  },
  Carousel: {
    dots: false,
    className: 'feature8-carousel',
    children: {
      className: 'feature8-block',
      titleWrapper: {
        className: 'feature8-carousel-title-wrapper',
        title: { className: 'feature8-carousel-title' },
      },
      children: [
        {
          name: 'block0',
          className: 'feature8-block-row',
          gutter: 120,
          title: {
            className: 'feature8-carousel-title-block',
            children: 'Building Owners',
          },
          children: [
            {
              className: 'feature8-block-col',
              md: 6,
              xs: 24,
              name: 'child0',
              arrow: {
                className: 'feature8-block-arrow',
                children:
                  'https://gw.alipayobjects.com/zos/basement_prod/167bee48-fbc0-436a-ba9e-c116b4044293.svg',
              },
              children: {
                className: 'feature8-block-child',
                children: [
                  {
                    name: 'image',
                    className: 'feature8-block-image',
                    children:
                      'https://gw.alipayobjects.com/zos/basement_prod/d8933673-1463-438a-ac43-1a8f193ebf34.svg',
                  },
                  {
                    name: 'title',
                    className: 'feature8-block-title',
                    children: <p>John Doe <br></br><b>Aveva Ceo</b></p>,
                  },
                  {
                    name: 'content',
                    className: 'feature8-block-content',
                    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci eu lobortis elementum nibh tellus molestie nunc non.',
                  },
                ],
              },
            },
            {
              className: 'feature8-block-col',
              md: 6,
              xs: 24,
              name: 'child1',
              arrow: {
                className: 'feature8-block-arrow',
                children:
                  'https://gw.alipayobjects.com/zos/basement_prod/167bee48-fbc0-436a-ba9e-c116b4044293.svg',
              },
              children: {
                className: 'feature8-block-child',
                children: [
                  {
                    name: 'image',
                    className: 'feature8-block-image',
                    children:
                      'https://gw.alipayobjects.com/zos/basement_prod/d8933673-1463-438a-ac43-1a8f193ebf34.svg',
                  },
                  {
                    name: 'title',
                    className: 'feature8-block-title',
                    children: <p>Mongo Alt <br></br><b>DERNetSoft Ceo</b></p>,
                  },
                  {
                    name: 'content',
                    className: 'feature8-block-content',
                    children:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lacus vel facilisis volutpat est velit egestas dui.',
                  },
                ],
              },
            },
            {
              className: 'feature8-block-col',
              md: 6,
              xs: 24,
              name: 'child2',
              arrow: {
                className: 'feature8-block-arrow',
                children:
                  'https://gw.alipayobjects.com/zos/basement_prod/167bee48-fbc0-436a-ba9e-c116b4044293.svg',
              },
              children: {
                className: 'feature8-block-child',
                children: [
                  {
                    name: 'image',
                    className: 'feature8-block-image',
                    children:
                      'https://gw.alipayobjects.com/zos/basement_prod/d8933673-1463-438a-ac43-1a8f193ebf34.svg',
                  },
                  {
                    name: 'title',
                    className: 'feature8-block-title',
                    children: <p>Piermenti Sfracellozzi <br></br><b>PVSolar Founder</b></p>
                  },
                  {
                    name: 'content',
                    className: 'feature8-block-content',
                    children:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper morbi tincidunt ornare massa eget.',
                  },
                ],
              },
            },
            {
              className: 'feature8-block-col',
              md: 6,
              xs: 24,
              name: 'child3',
              arrow: {
                className: 'feature8-block-arrow',
                children:
                  'https://gw.alipayobjects.com/zos/basement_prod/167bee48-fbc0-436a-ba9e-c116b4044293.svg',
              },
              children: {
                className: 'feature8-block-child',
                children: [
                  {
                    name: 'image',
                    className: 'feature8-block-image',
                    children:
                      'https://gw.alipayobjects.com/zos/basement_prod/d8933673-1463-438a-ac43-1a8f193ebf34.svg',
                  },
                  {
                    name: 'title',
                    className: 'feature8-block-title',
                    children: <p>Pietro Smusi <br></br><b>TrackER Founder</b></p>,
                  },
                  {
                    name: 'content',
                    className: 'feature8-block-content',
                    children:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Morbi leo urna molestie at.',
                  },
                ],
              },
            },
          ],
        },
        {
          name: 'block1',
          className: 'feature8-block-row',
          gutter: 120,
          title: {
            children: 'Energy Vendors',
            className: 'feature8-carousel-title-block',
          },
          children: [
            {
              className: 'feature8-block-col',
              md: 6,
              xs: 24,
              name: 'child0',
              arrow: {
                className: 'feature8-block-arrow',
                children:
                  'https://gw.alipayobjects.com/zos/basement_prod/167bee48-fbc0-436a-ba9e-c116b4044293.svg',
              },
              children: {
                className: 'feature8-block-child',
                children: [
                  {
                    name: 'image',
                    className: 'feature8-block-image',
                    children:
                      'https://gw.alipayobjects.com/zos/basement_prod/d8933673-1463-438a-ac43-1a8f193ebf34.svg',
                  },
                  {
                    name: 'title',
                    className: 'feature8-block-title',
                    children: <p>Emanuele Dall'Ara <br></br><b>TrackER Energy Producer</b></p>,
                  },
                  {
                    name: 'content',
                    className: 'feature8-block-content',
                    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Morbi leo urna molestie at.',
                  },
                ],
              },
            },
            {
              className: 'feature8-block-col',
              md: 6,
              xs: 24,
              name: 'child1',
              arrow: {
                className: 'feature8-block-arrow',
                children:
                  'https://gw.alipayobjects.com/zos/basement_prod/167bee48-fbc0-436a-ba9e-c116b4044293.svg',
              },
              children: {
                className: 'feature8-block-child',
                children: [
                  {
                    name: 'image',
                    className: 'feature8-block-image',
                    children:
                      'https://gw.alipayobjects.com/zos/basement_prod/d8933673-1463-438a-ac43-1a8f193ebf34.svg',
                  },
                  {
                    name: 'title',
                    className: 'feature8-block-title',
                    children: <p>Nicholas Ricci<br></br><b>ZylanTv CEO</b></p>,
                  },
                  {
                    name: 'content',
                    className: 'feature8-block-content',
                    children:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper morbi tincidunt ornare massa eget.',
                  },
                ],
              },
            },
            {
              className: 'feature8-block-col',
              md: 6,
              xs: 24,
              name: 'child2',
              arrow: {
                className: 'feature8-block-arrow',
                children:
                  'https://gw.alipayobjects.com/zos/basement_prod/167bee48-fbc0-436a-ba9e-c116b4044293.svg',
              },
              children: {
                className: 'feature8-block-child',
                children: [
                  {
                    name: 'image',
                    className: 'feature8-block-image',
                    children:
                      'https://gw.alipayobjects.com/zos/basement_prod/d8933673-1463-438a-ac43-1a8f193ebf34.svg',
                  },
                  {
                    name: 'title',
                    className: 'feature8-block-title',
                    children: <p>Tony Osvaldo <br></br><b>Osvaldo Energy Owner</b></p>,
                  },
                  {
                    name: 'content',
                    className: 'feature8-block-content',
                    children:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lacus vel facilisis volutpat est velit egestas dui.',
                  },
                ],
              },
            },
            {
              className: 'feature8-block-col',
              md: 6,
              xs: 24,
              name: 'child3',
              arrow: {
                className: 'feature8-block-arrow',
                children:
                  'https://gw.alipayobjects.com/zos/basement_prod/167bee48-fbc0-436a-ba9e-c116b4044293.svg',
              },
              children: {
                className: 'feature8-block-child',
                children: [
                  {
                    name: 'image',
                    className: 'feature8-block-image',
                    children:
                      'https://gw.alipayobjects.com/zos/basement_prod/d8933673-1463-438a-ac43-1a8f193ebf34.svg',
                  },
                  {
                    name: 'title',
                    className: 'feature8-block-title',
                    children: <p>Pingu tha PENGUIN <br></br><b>PINGU Production CEO</b></p>,
                  },
                  {
                    name: 'content',
                    className: 'feature8-block-content',
                    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci eu lobortis elementum nibh tellus molestie nunc non.',
                  },
                ],
              },
            },
          ],
        },
      ],
    },
  },
};
