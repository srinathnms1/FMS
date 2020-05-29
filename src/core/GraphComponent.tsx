import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

interface IProps {
    data?: number[];
}

export const GraphComponent = (props: IProps) => {
    const d3Container = useRef(null);
    const styles = {
        container: {
            display: 'grid',
            justifyItems: 'center'
        }
    };

    useEffect(
        () => {
            const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];

            const w = 600;
            const h = 300;

            let svg = d3
                .select(d3Container.current)
                .append('svg')
                .attr('width', w)
                .attr('height', h)
                .attr('class', 'bar')
                .selectAll('rect')
                .data(dataset)
                .enter()
                .append('rect')
                .attr('fill', 'navy')
                .attr('class', 'sBar')
                .attr('x', (d, i) => i * 60)
                .attr('y', (d, i) => {
                    return h - 7 * d;
                })
                .attr('width', 50)
                .attr('height', (d, i) => 7 * d)
                .append('title')
                .text(d => d)
                .selectAll('text')
                .data(dataset)
                .enter()
                .append('text')
                .style('font-size', 18)
                .attr('fill', 'red')
                .attr('x', (d, i) => i * 60)
                .attr('y', (d, i) => h - 7 * d - 3)
                .text(d => d);
        },
        [props.data, d3Container.current]);

    return (
        <div ref={d3Container} style={styles.container}>
            <h1 style={{ textAlign: 'center' }}>Bar</h1>
        </div>
    );
};