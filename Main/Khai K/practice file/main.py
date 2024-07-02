import json

def load_data(filename):
    with open(filename, 'r') as file:
        return json.load(file)

def count_vehicles(data):
    vehicle_counts = {}
    
    for position in data['positions']:
        cars = data['positions'][position]['vehicles']['cars']
        bikes = data['positions'][position]['vehicles']['bike']
        total = cars + bikes
        vehicle_counts[position] = {
            'cars': cars,
            'bikes': bikes,
            'total': total
        }
    
    return vehicle_counts

def display_counts(vehicle_counts):

    for position, counts in vehicle_counts.items():
        cars = counts['cars']
        bikes = counts['bikes']
        total = counts['total']


        print(f"Position {position.upper()}:")
        print(f"  Cars: {cars}")
        print(f"  Bikes: {bikes}")
        print(f"  Total Vehicles: {total}")
        print()



def main():
    data = load_data('data.json')
    vehicle_counts = count_vehicles(data)
    print(vehicle_counts)
    display_counts(vehicle_counts)

if __name__ == "__main__":
    main()



