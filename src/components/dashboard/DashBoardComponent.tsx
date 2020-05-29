import * as React from 'react';
import * as d3 from 'd3';
import { PieArcDatum } from 'd3-shape';
import { useEffect, useRef } from 'react';
import { Arc, create, ValueFn, Line } from 'd3';

interface IProps {
  data?: number[];
}

interface IPopulation {
  population: number;
}

interface IData extends PieArcDatum<IData> {
  name: string;
  value: number;
}

const DashBoardComponent = (props: IProps) => {
  const d3Container1 = useRef(null);

  const styles = {
    container: {
      display: 'grid',
      justifyItems: 'center'
    }
  };

  useEffect(
    () => {

      const data = [
        { name: '<5', value: 19912018 },
        { name: '5-9', value: 20501982 },
        { name: '10-14', value: 20679786 },
        { name: '15-19', value: 21354481 },
        { name: '20-24', value: 22604232 },
        { name: '25-29', value: 21698010 },
        { name: '30-34', value: 21183639 },
        { name: '35-39', value: 19855782 },
        { name: '40-44', value: 20796128 },
        { name: '45-49', value: 21370368 },
        { name: '50-54', value: 22525490 },
        { name: '55-59', value: 21001947 },
        { name: '60-64', value: 18415681 },
        { name: '65-69', value: 14547446 },
        { name: '70-74', value: 10587721 },
        { name: '75-79', value: 7730129 },
        { name: '80-84', value: 5811429 },
        { name: '≥85', value: 5938752 }
      ] as IData[];
      const width = 500;
      const height = Math.min(width, 500);

      const pie = d3.pie<IData>()
        .padAngle(0.005)
        .sort(null)
        .value((d) => d?.data?.value);

      const arcs = pie(data);

      const radius = Math.min(width, height) / 2;
      const arc = d3.arc<PieArcDatum<IData>>().innerRadius(radius * 0.67).outerRadius(radius - 1);

      const color = d3.scaleOrdinal<string>()
        .domain(data.map(d => d.name))
        .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length).reverse());

      const lineGenerator = d3.line<IData>()
        .x((d: IData) => d.endAngle)
        .y((d: IData) => d.startAngle);

      // const value: PieArcDatum<IData> = [-width / 2, -height / 2, width, height];
      const svg = d3
        .select<any, PieArcDatum<IData>>(d3Container1.current)
        .append('svg')
        .attr('viewBox', '-477,-250,954,500');

      svg.selectAll<SVGElement, PieArcDatum<IData>>('path')
        .data(arcs)
        .join('path')
        .attr('fill', (d: PieArcDatum<IData>) => color(d.data.name))
        .attr('d', arc)
        .append('title')
        .text((d: PieArcDatum<IData>) => `${d.data.name}: ${d.data.value.toLocaleString()}`);

      svg.append('g')
        .attr('font-family', 'sans-serif')
        .attr('font-size', 12)
        .attr('text-anchor', 'middle')
        .selectAll('text')
        .data(arcs)
        .join('text')
        .attr('transform', (d: PieArcDatum<IData>) => `translate(${arc.centroid(d?.data)})`)
        .call((text) => text.append('tspan')
          .attr('y', '-0.4em')
          .attr('font-weight', 'bold')
          .text((d: PieArcDatum<IData>) => d.data.name))
        .call((text) => text.filter((d: PieArcDatum<IData>) => (d.startAngle - d.startAngle) > 0.25).append('tspan')
          .attr('x', 0)
          .attr('y', '0.7em')
          .attr('fill-opacity', 0.7)
          .text((d: PieArcDatum<IData>) => d?.data?.value.toLocaleString()));
    },
    [props.data, d3Container1.current]);

  return (
    <div ref={d3Container1} style={styles.container}>
      <h1 style={{ textAlign: 'center' }}>Pie</h1>
    </div>
  );
};

export default DashBoardComponent;