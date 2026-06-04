import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

# Set global style for a clean, premium "ReportLab" aesthetic
plt.style.use('seaborn-v0_8-whitegrid')
colors = {'navy': '#1f497d', 'orange': '#ff7f0e', 'grey': '#d3d3d3', 'red': '#c00000'}

def plot_cash_waterfall():
    """
    Visualizes the immediate cash controls and the JPY 300k reserve floor.
    Data sourced from Section 11 / Cash Position table.
    """
    stages = ['Bank Cash', 'May Pay', 'May Travel', 'Collect AR', 'June Rev', 'June Pay', 'Travel Reserve']
    # Running balances from the plan
    balances = [369598, 311098, 309140, 343865, 430990, 402290, 398715]
    
    fig, ax = plt.subplots(figsize=(10, 6))
    
    # Plot the waterfall bars
    bars = ax.bar(stages, balances, color=colors['navy'], width=0.6)
    
    # Add the JPY 300k reserve floor line
    ax.axhline(y=300000, color=colors['red'], linestyle='--', linewidth=1.5, label='JPY 300k Reserve Floor')
    
    # Add value labels on top of the bars
    for bar in bars:
        yval = bar.get_height()
        ax.text(bar.get_x() + bar.get_width()/2, yval + 5000, f"{int(yval/1000)}k", 
                ha='center', va='bottom', fontweight='bold')
    
    ax.set_title('Cash Waterfall After Committed Payouts & AR Controls', fontsize=14, pad=15, fontweight='bold')
    ax.set_ylabel('JPY', fontsize=12)
    ax.legend(loc='upper left')
    plt.xticks(rotation=15)
    plt.tight_layout()
    plt.savefig('cash_waterfall.png')

def plot_december_scenarios():
    """
    Visualizes December Revenue vs. Operating Net across the 6 scenarios.
    Data sourced from the Realistic Filtered Grid.
    """
    scenarios = ['Defense', 'Minimum', 'Good', 'Stretch', 'Aggressive', 'Very Aggressive']
    dec_revenue = [278092, 483535, 688978, 863686, 1317524, 1625473]
    dec_net = [159860, 307464, 454414, 580250, 907036, 1123836]
    
    x = np.arange(len(scenarios))
    width = 0.35
    
    fig, ax = plt.subplots(figsize=(12, 6))
    bars1 = ax.bar(x - width/2, dec_revenue, width, label='Dec Revenue', color=colors['navy'])
    bars2 = ax.bar(x + width/2, dec_net, width, label='Dec Operating Net', color=colors['orange'])
    
    # JPY 1M Target Line
    ax.axhline(y=1000000, color=colors['grey'], linestyle='--', linewidth=1.5, label='JPY 1M Revenue Target')
    
    ax.set_title('Realistic Filtered Grid: December Revenue vs Operating Net', fontsize=14, pad=15, fontweight='bold')
    ax.set_ylabel('JPY', fontsize=12)
    ax.set_xticks(x)
    ax.set_xticklabels(scenarios)
    ax.legend(loc='upper left')
    
    plt.tight_layout()
    plt.savefig('december_scenarios.png')

def plot_5_year_projection():
    """
    Visualizes the Base-Case 5-Year Projections.
    Data sourced from Section 13: Long-Term Financial Projections.
    """
    years = ['2026', '2027', '2028', '2029', '2030']
    revenue_m = [4.3, 13.3, 32.4, 66.6, 121.6]
    net_m = [0.85, 2.66, 6.61, 13.1, 24.3]
    
    x = np.arange(len(years))
    width = 0.35
    
    fig, ax = plt.subplots(figsize=(10, 6))
    
    bars1 = ax.bar(x - width/2, revenue_m, width, label='Revenue', color=colors['navy'])
    bars2 = ax.bar(x + width/2, net_m, width, label='Operating Net', color='#2ca02c') # Green for net profit
    
    # Add value labels
    for bar in bars1:
        yval = bar.get_height()
        ax.text(bar.get_x() + bar.get_width()/2, yval + 1, f"{yval}", ha='center', va='bottom', fontsize=9)
        
    ax.set_title('Base-Case 5-Year Revenue and Operating Net Projection', fontsize=14, pad=15, fontweight='bold')
    ax.set_ylabel('JPY Millions', fontsize=12)
    ax.set_xticks(x)
    ax.set_xticklabels(years)
    ax.legend(loc='upper left')
    
    plt.tight_layout()
    plt.savefig('5_year_projection.png')

if __name__ == "__main__":
    print("Generating Petra Education Visualizations...")
    plot_cash_waterfall()
    plot_december_scenarios()
    plot_5_year_projection()
    print("Charts generated successfully.")
