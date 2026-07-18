import 'package:flutter_test/flutter_test.dart';

import 'package:enactus_hub/app.dart';

void main() {
  testWidgets('App renders splash screen', (WidgetTester tester) async {
    await tester.pumpWidget(const EnactusHubApp());
    expect(find.text('Enactus Hub'), findsOneWidget);
  });
}
