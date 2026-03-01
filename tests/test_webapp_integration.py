"""Smoke tests for Sonos Web App integration in dashboard UI."""
import unittest

from app import create_app


class SonosWebAppIntegrationTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app('testing')
        self.client = self.app.test_client()

    def test_index_contains_sonos_webapp_navigation_and_companion_actions(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)

        html = response.get_data(as_text=True)
        self.assertIn("activeTab = 'sonos_webapp'", html)
        self.assertIn("https://play.sonos.com/zh-tw/web-app", html)
        self.assertIn("tab_sonos_webapp", html)
        self.assertIn("launchSonosWebAppWindow", html)
        self.assertIn("copySonosWebAppLink", html)
        self.assertIn("launchSonosWebAppSameTab", html)
        self.assertIn("copyReturnShortcut", html)

    def test_return_route_exists(self):
        response = self.client.get('/return')
        self.assertEqual(response.status_code, 200)
        html = response.get_data(as_text=True)
        self.assertIn("sonos_return_url", html)


if __name__ == '__main__':
    unittest.main()
