import React from 'react';
import styled from 'styled-components';
import {View, Text, Image} from 'react-native';
import {__FONTS} from '../layout/fonts';
import {__COLORS} from '../layout/colors';

const Label = styled(Text)``;

export default class extends React.Component {
	render() {
		return (
			<View style={{width: 240, flexDirection: 'row', alignItems: 'center'}}>
				<Image
					style={{
						height: 114 / 4,
						width: 143 / 4,
						tintColor: '#58B368',
						marginRight: 10
					}}
					source={require('../../assets/bicycle.png')}
				/>
				<View>
					<Label
						style={{
							fontWeight: 'bold',
							fontFamily: __FONTS.BOLD,
							color: __COLORS.FIRST
						}}
					>
						{String(this.props.bikesAvailable)} bike
						{this.props.bikesAvailable === 1 ? '' : 's'} available
					</Label>
					<View style={{height: 3}} />
					<Label
						style={{
							color: __COLORS.FIRST,
							fontFamily: __FONTS.REGULAR
						}}
					>
						{this.props.distance ? this.props.distance.toFixed(1) : null} km
						away
					</Label>
				</View>
			</View>
		);
	}
}
